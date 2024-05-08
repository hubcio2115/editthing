import React, { createContext, useContext, type FC, type PropsWithChildren, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOwnOrganizationByName, getMembersOfOrganization } from "~/server/actions/organization";

interface OrganizationData {
    organization: any;
    userData: any;
}

interface OrganizationContextType extends OrganizationData {
    refetchData: () => void;
}

const OrganizationContext = createContext<OrganizationContextType>({
    organization: null,
    userData: null,
    refetchData: () => { }
});

export const useOrganizationContext = () => useContext(OrganizationContext);

interface OrganizationProviderProps {
    children: ReactNode;
    params: {
        name: string;
    };
}

export const OrganizationProvider: FC<OrganizationProviderProps> = ({ children, params }) => {
    const { data: organizationData, isFetched, refetch: refetchOrganization } = useQuery({
        queryKey: ["organization", params.name],
        queryFn: async () => {
            const [organizations, err] = await getOwnOrganizationByName(params.name);
            if (err !== null) {
                console.error(err);
            }
            return organizations;
        }
    });



    const { data: userData, refetch: refetchUserData } = useQuery({
        queryKey: ["members", organizationData?.id],
        queryFn: () => getMembersOfOrganization(organizationData!.id),
        enabled: !!organizationData?.id && isFetched,
    });

    const refetchData = () => {
        refetchOrganization();
        refetchUserData();
    };

    const value = {
        organization: organizationData,
        userData,
        refetchData
    };

    return (
        <OrganizationContext.Provider value={value}>
            {children}
        </OrganizationContext.Provider>
    );
};
