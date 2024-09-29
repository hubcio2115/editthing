import type { youtube_v3 } from "@googleapis/youtube";
import type { Project } from "../validators/project";

function getProjectMockData(videos: youtube_v3.Schema$Video[]): Project[] {
  return videos.map((video, i) => ({
    id: i,
    videoId: video.id!,
    title: video.snippet!.title!,
    description: video.snippet!.description!,
    publishAt: video.snippet!.publishedAt!,
    categoryId: video.snippet!.categoryId!,
    channelId: video.snippet!.channelId!,
    createdAt: new Date(),
    defaultLanguage: video.snippet!.defaultLanguage!,
    tags: video.snippet!.tags?.join(",") ?? "",
    embeddable: true,
    license: "youtube",
    privacyStatus: "public",
    publicStatsViewable: true,
    notifySubscribers: true,
    organizationId: 1,
    selfDeclaredMadeForKids: false,
  }));
}

const videoMockData: youtube_v3.Schema$Video[] = [
  {
    kind: "youtube#video",
    etag: "T-UNgHPGtjRPrBGma90qp-VgbeM",
    id: "snX5YyflrGw",
    snippet: {
      publishedAt: "2024-09-28T16:00:00Z",
      channelId: "UCX6OQ3DkcsbYNE6H8uQQuVA",
      title: "100 Identical Twins Fight For $250,000",
      description:
        "I’ve never seen this many twins in one place before lol\nOur brand new flavor is here: Cookies & Creme, made with rich chocolatey filling, studded with crunchy cookie pieces and real creamy white chocolate. Now available at Walmart & Target! https://feastables.com/products/cookies-creme\n\nLunch just got better. #LeaveNoCrumbs https://lunchly.com/pages/lunchly-locator\n\nNew Merch - https://mrbeast.store\n\nCheck out Viewstats! - https://www.viewstats.com/\n\nSUBSCRIBE OR I TAKE YOUR DOG\n╔═╦╗╔╦╗╔═╦═╦╦╦╦╗╔═╗\n║╚╣║║║╚╣╚╣╔╣╔╣║╚╣═╣ \n╠╗║╚╝║║╠╗║╚╣║║║║║═╣\n╚═╩══╩═╩═╩═╩╝╚╩═╩═╝\n\nFor any questions or inquiries regarding this video, please reach out to chucky@mrbeastbusiness.com\n\nMusic Provided by https://www.extrememusic.com\n\n----------------------------------------------------------------\nfollow all of these or i will kick you\n\n• Facebook - https://www.facebook.com/MrBeast6000/\n• Twitter - https://twitter.com/MrBeast\n•  Instagram - https://www.instagram.com/mrbeast\n•  Im Hiring! - https://www.mrbeastjobs.com/",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/snX5YyflrGw/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/snX5YyflrGw/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/snX5YyflrGw/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/snX5YyflrGw/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/snX5YyflrGw/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "MrBeast",
      categoryId: "24",
      liveBroadcastContent: "none",
      defaultLanguage: "en",
      localized: {
        title: "100 Identical Twins Fight For $250,000",
        description:
          "I’ve never seen this many twins in one place before lol\nOur brand new flavor is here: Cookies & Creme, made with rich chocolatey filling, studded with crunchy cookie pieces and real creamy white chocolate. Now available at Walmart & Target! https://feastables.com/products/cookies-creme\n\nLunch just got better. #LeaveNoCrumbs https://lunchly.com/pages/lunchly-locator\n\nNew Merch - https://mrbeast.store\n\nCheck out Viewstats! - https://www.viewstats.com/\n\nSUBSCRIBE OR I TAKE YOUR DOG\n╔═╦╗╔╦╗╔═╦═╦╦╦╦╗╔═╗\n║╚╣║║║╚╣╚╣╔╣╔╣║╚╣═╣ \n╠╗║╚╝║║╠╗║╚╣║║║║║═╣\n╚═╩══╩═╩═╩═╩╝╚╩═╩═╝\n\nFor any questions or inquiries regarding this video, please reach out to chucky@mrbeastbusiness.com\n\nMusic Provided by https://www.extrememusic.com\n\n----------------------------------------------------------------\nfollow all of these or i will kick you\n\n• Facebook - https://www.facebook.com/MrBeast6000/\n• Twitter - https://twitter.com/MrBeast\n•  Instagram - https://www.instagram.com/mrbeast\n•  Im Hiring! - https://www.mrbeastjobs.com/",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "1VXM2-wubXk4PDsFStDYTbJlruY",
    id: "fh3JotsS0FE",
    snippet: {
      publishedAt: "2024-09-29T00:02:06Z",
      channelId: "UCpwix-O6ceqMgdxhqIynzFA",
      title:
        "Colorado Buffaloes vs. UCF Knights Highlights | FOX College Football",
      description:
        "Check out the best moments from this Week 5 matchup between the Colorado Buffaloes and the UCF Knights.\n\n#CFBonFOX #CFB #ncaafootball #coloradobuffalos #ucffootball #sheduersanders #deionsanders #primetime \n\nSUBSCRIBE to get the latest CFB on FOX content: https://foxs.pt/SubscribeCFBonFOX\n\nCFB season is right around the corner. Download the FOX Sports App so you’re ready to stream 🏈 Download Here 📲 :  https://t.co/CRhWt4ryp3\n\n►FOX Sports YouTube Channel: http://foxs.pt/SubscribeFOXSPORTS\n►Subscribe to the Bear Bets podcast: https://bit.ly/BearBets\n►PBC ON FOX’s YouTube Channel: https://foxs.pt/SubscribePBCONFOX\n►WWE ON FOX YouTube channel: https://foxs.pt/SubscribeWWEONFOX\n►FOX Soccer’s YouTube channel: https://foxs.pt/SubscribeFOXSOCCER\n►NASCAR ON FOX YouTube channel: https://foxs.pt/SubscribeNASCARonFOX\n \nSee more from CFB on FOX: https://foxs.pt/CFBONFOXFoxSports\nLike CFB on FOX on Facebook: https://foxs.pt/CFBONFOXFacebook\nFollow CFB on FOX on Twitter: https://foxs.pt/CFBONFOXTwitter\nFollow CFB on FOX on Instagram: https://foxs.pt/CFBONFOXInstagram\n\nAbout CFB on FOX:\nThe official home for college football on FOX — the biggest names, the biggest games, the highlights, the moments, and everything you need as a college football fan. Check out the best of Big Noon Kickoff, Gus Johnson’s Call of the Game, Joel Klatt’s Breaking the Huddle, our exclusive, live Coach’s Cams, and much, much more, right here on CFB on FOX!\n\nCFB on FOX\nhttps://www.youtube.com/c/CFBONFOX",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/fh3JotsS0FE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/fh3JotsS0FE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/fh3JotsS0FE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/fh3JotsS0FE/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/fh3JotsS0FE/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "CFB ON FOX",
      tags: [
        "cfb on fox",
        "cfb",
        "college football",
        "fox college football",
        "fs1",
        "fox sports",
        "Colorado Buffaloes",
        "Deion Sanders",
      ],
      categoryId: "17",
      liveBroadcastContent: "none",
      localized: {
        title:
          "Colorado Buffaloes vs. UCF Knights Highlights | FOX College Football",
        description:
          "Check out the best moments from this Week 5 matchup between the Colorado Buffaloes and the UCF Knights.\n\n#CFBonFOX #CFB #ncaafootball #coloradobuffalos #ucffootball #sheduersanders #deionsanders #primetime \n\nSUBSCRIBE to get the latest CFB on FOX content: https://foxs.pt/SubscribeCFBonFOX\n\nCFB season is right around the corner. Download the FOX Sports App so you’re ready to stream 🏈 Download Here 📲 :  https://t.co/CRhWt4ryp3\n\n►FOX Sports YouTube Channel: http://foxs.pt/SubscribeFOXSPORTS\n►Subscribe to the Bear Bets podcast: https://bit.ly/BearBets\n►PBC ON FOX’s YouTube Channel: https://foxs.pt/SubscribePBCONFOX\n►WWE ON FOX YouTube channel: https://foxs.pt/SubscribeWWEONFOX\n►FOX Soccer’s YouTube channel: https://foxs.pt/SubscribeFOXSOCCER\n►NASCAR ON FOX YouTube channel: https://foxs.pt/SubscribeNASCARonFOX\n \nSee more from CFB on FOX: https://foxs.pt/CFBONFOXFoxSports\nLike CFB on FOX on Facebook: https://foxs.pt/CFBONFOXFacebook\nFollow CFB on FOX on Twitter: https://foxs.pt/CFBONFOXTwitter\nFollow CFB on FOX on Instagram: https://foxs.pt/CFBONFOXInstagram\n\nAbout CFB on FOX:\nThe official home for college football on FOX — the biggest names, the biggest games, the highlights, the moments, and everything you need as a college football fan. Check out the best of Big Noon Kickoff, Gus Johnson’s Call of the Game, Joel Klatt’s Breaking the Huddle, our exclusive, live Coach’s Cams, and much, much more, right here on CFB on FOX!\n\nCFB on FOX\nhttps://www.youtube.com/c/CFBONFOX",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "pQ8UocDxycPFg0AjpzsCfeY_B-M",
    id: "ae4vpzIxL6k",
    snippet: {
      publishedAt: "2024-09-29T03:43:51Z",
      channelId: "UCzRWWsFjqHk1an4OnVPsl9g",
      title:
        "Georgia Bulldogs vs. Alabama Crimson Tide | Full Game Highlights | ESPN College Football",
      description:
        "Check out these highlights as the No. 4 Alabama Crimson Tide force a late turnover with 40 seconds to go to defeat the No. 2 Georgia Bulldogs, 41-34.\n\n✔️Subscribe to ESPN+ http://espnplus.com/youtube\n✔️ Get the ESPN App: http://www.espn.com/espn/apps/espn\n✔️Subscribe to ESPN on YouTube: http://es.pn/SUBSCRIBEtoYOUTUBE\n✔️ Subscribe to NBA on ESPN on YouTube: http://bit.ly/SUBSCRIBEtoNBAonESPN\n✔️ Watch ESPN on YouTube TV: http://es.pn/YouTubeTV",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/ae4vpzIxL6k/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/ae4vpzIxL6k/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/ae4vpzIxL6k/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/ae4vpzIxL6k/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/ae4vpzIxL6k/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "ESPN College Football",
      tags: [
        "college football espn",
        "espn college football",
        "college football",
        "college football on espn",
        "espn",
        "cfb",
        "college football 2024",
        "CFBHighlights",
      ],
      categoryId: "17",
      liveBroadcastContent: "none",
      localized: {
        title:
          "Georgia Bulldogs vs. Alabama Crimson Tide | Full Game Highlights | ESPN College Football",
        description:
          "Check out these highlights as the No. 4 Alabama Crimson Tide force a late turnover with 40 seconds to go to defeat the No. 2 Georgia Bulldogs, 41-34.\n\n✔️Subscribe to ESPN+ http://espnplus.com/youtube\n✔️ Get the ESPN App: http://www.espn.com/espn/apps/espn\n✔️Subscribe to ESPN on YouTube: http://es.pn/SUBSCRIBEtoYOUTUBE\n✔️ Subscribe to NBA on ESPN on YouTube: http://bit.ly/SUBSCRIBEtoNBAonESPN\n✔️ Watch ESPN on YouTube TV: http://es.pn/YouTubeTV",
      },
    },
  },
  {
    kind: "youtube#video",
    etag: "n8CQ9AC95yg_h2HbH6HN3G7XWTk",
    id: "9ZXzsjeRtdk",
    snippet: {
      publishedAt: "2024-09-28T15:00:25Z",
      channelId: "UCnmGIkw-KdI0W5siakKPKog",
      title: "I Tried Every Airbnb Category",
      description: "OMG! a rat!",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/9ZXzsjeRtdk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/9ZXzsjeRtdk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/9ZXzsjeRtdk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/9ZXzsjeRtdk/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/9ZXzsjeRtdk/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "Ryan Trahan",
      tags: [
        "Ryan",
        "Trahan",
        "airbnb",
        "I tried every airbnb category",
        "weird hotel",
        "I stayed in",
      ],
      categoryId: "24",
      liveBroadcastContent: "none",
      localized: {
        title: "I Tried Every Airbnb Category",
        description: "OMG! a rat!",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "gbKmFSTWIKt_TCQcrN8hdl7l1kE",
    id: "qnX6sPFjXnA",
    snippet: {
      publishedAt: "2024-09-28T18:03:04Z",
      channelId: "UC1sELGmy5jp5fQUugmuYlXQ",
      title: "Minecraft Live 2024",
      description:
        "American Sign Language: https://youtube.com/live/I4kSs8b41fM\nBritish Sign Language: https://youtube.com/live/u55kple1DIw\nAudio Descriptions: https://youtube.com/live/z0aMu2no7RY\n\nTune into Minecraft LIVE! Watch a new take on Minecraft LIVE on September 28 at 1PM EDT. Broadcast from the Mojang HQ, we’ll be unveiling new features and more!",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/qnX6sPFjXnA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/qnX6sPFjXnA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/qnX6sPFjXnA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/qnX6sPFjXnA/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/qnX6sPFjXnA/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "Minecraft",
      tags: ["Minecraft", "Minecraft Live"],
      categoryId: "20",
      liveBroadcastContent: "none",
      localized: {
        title: "Minecraft Live 2024",
        description:
          "American Sign Language: https://youtube.com/live/I4kSs8b41fM\nBritish Sign Language: https://youtube.com/live/u55kple1DIw\nAudio Descriptions: https://youtube.com/live/z0aMu2no7RY\n\nTune into Minecraft LIVE! Watch a new take on Minecraft LIVE on September 28 at 1PM EDT. Broadcast from the Mojang HQ, we’ll be unveiling new features and more!",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "zRDu0Fb7DLtGggqs2F0KOElw9zM",
    id: "eHEQY3ua_uY",
    snippet: {
      publishedAt: "2024-09-28T17:55:46Z",
      channelId: "UC1sELGmy5jp5fQUugmuYlXQ",
      title: "Minecraft Live 2024: Pale Garden & Creaking",
      description:
        "There’s something that isn’t quite right with this upcoming Minecraft game drop. Something... eerie? Announced at Minecraft Live 2024, the pale garden is a new and mysterious biome coming to the Overworld. Learn what the developers had to share about this unsettling setting, including its features and a certain... startling new foe.\n\nWatch the full Minecraft LIVE 2024 show here!  \nhttps://www.youtube.com/watch?v=qnX6sPFjXnA",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/eHEQY3ua_uY/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/eHEQY3ua_uY/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/eHEQY3ua_uY/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/eHEQY3ua_uY/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/eHEQY3ua_uY/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "Minecraft",
      tags: ["Minecraft", "MInecraft Live"],
      categoryId: "20",
      liveBroadcastContent: "none",
      localized: {
        title: "Minecraft Live 2024: Pale Garden & Creaking",
        description:
          "There’s something that isn’t quite right with this upcoming Minecraft game drop. Something... eerie? Announced at Minecraft Live 2024, the pale garden is a new and mysterious biome coming to the Overworld. Learn what the developers had to share about this unsettling setting, including its features and a certain... startling new foe.\n\nWatch the full Minecraft LIVE 2024 show here!  \nhttps://www.youtube.com/watch?v=qnX6sPFjXnA",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "UubyfJCzNXVVhyP_XKFIJhUGWUc",
    id: "QMe-ce78GJk",
    snippet: {
      publishedAt: "2024-09-27T22:33:10Z",
      channelId: "UCXoMM35ugF5iOzAEb-PmfRA",
      title:
        "Hurricane Helene Historic Storm Surge Devastates Cedar Key, Florida",
      description:
        "Stop data brokers from exposing your personal information. Go to my sponsor https://aura.com/jp to get a 14-day free trial and see how much of yours is being sold!\n\nWitness the full fury of Hurricane Helene as it slams into Cedar Key, Florida! This powerful Category 4 storm unleashes a historic storm surge, causing widespread devastation. Homes and businesses are ripped apart, leaving generations of residents in shock. Many have never seen a surge this high, even those whose families have lived in Cedar Key since the 1800s.\n\nThis video documents the destruction and the heartbreak left in the wake of Hurricane Helene.\n\n00:00 Intro\n01:35 Before the Hurricane\n02:24 Storm surge begins\n03:37 Peak storm surge\n06:59 The morning after at the Faraway Inn\n08:22 Historic downtown lost a lot of history\n10:25 Cedar Key's future",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/QMe-ce78GJk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/QMe-ce78GJk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/QMe-ce78GJk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/QMe-ce78GJk/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/QMe-ce78GJk/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "Jonathan Petramala",
      tags: [
        "hurricane helene",
        "hurricane storm surge",
        "hurricane damage",
        "category 4 hurricane footage",
        "category 4 hurricane",
        "storm surge",
        "major hurricane helene",
        "florida hurricane",
        "natural disaster",
        "cedar key",
        "cedar key florida",
        "cedar key hurricane damage",
        "devastation in cedar key",
        "hurricane helene live",
        "hurricane",
        "reed timmer",
        "ryan hall",
        "ryan hall y'all",
        "hurricane hits florida",
        "storm surge florida",
        "storm surge video",
      ],
      categoryId: "25",
      liveBroadcastContent: "none",
      localized: {
        title:
          "Hurricane Helene Historic Storm Surge Devastates Cedar Key, Florida",
        description:
          "Stop data brokers from exposing your personal information. Go to my sponsor https://aura.com/jp to get a 14-day free trial and see how much of yours is being sold!\n\nWitness the full fury of Hurricane Helene as it slams into Cedar Key, Florida! This powerful Category 4 storm unleashes a historic storm surge, causing widespread devastation. Homes and businesses are ripped apart, leaving generations of residents in shock. Many have never seen a surge this high, even those whose families have lived in Cedar Key since the 1800s.\n\nThis video documents the destruction and the heartbreak left in the wake of Hurricane Helene.\n\n00:00 Intro\n01:35 Before the Hurricane\n02:24 Storm surge begins\n03:37 Peak storm surge\n06:59 The morning after at the Faraway Inn\n08:22 Historic downtown lost a lot of history\n10:25 Cedar Key's future",
      },
      defaultAudioLanguage: "en-US",
    },
  },
  {
    kind: "youtube#video",
    etag: "JoJe5_kGzehoKcZge1xNrt7-9Sc",
    id: "BLCOufzhaMY",
    snippet: {
      publishedAt: "2024-09-28T15:01:07Z",
      channelId: "UCo8bcnLyZH8tBIH9V1mLgqQ",
      title: "We Made It This Far",
      description:
        "Thank you for 10 years!!\nInstagram ➤ https://www.instagram.com/theodd1sout/\nTikTok ➤ https://www.tiktok.com/@theoddtiktoksout\nTwitter ➤ https://twitter.com/theodd1sout\n\nART TEAM:\nEmilee Dummer ➤ https://www.instagram.com/edummerart/\nKelly Jensen ➤ https://www.instagram.com/kelly_anne_art/\nClaire Anne ➤ https://www.instagram.com/claireanneillustration\nAmelia Rosenbalm ➤ https://www.instagram.com/galloame/\nRikikuniyuki_art ➤ https://www.instagram.com/rikikuniyuki_art/",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/BLCOufzhaMY/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/BLCOufzhaMY/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/BLCOufzhaMY/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/BLCOufzhaMY/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/BLCOufzhaMY/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "TheOdd1sOut",
      categoryId: "23",
      liveBroadcastContent: "none",
      localized: {
        title: "We Made It This Far",
        description:
          "Thank you for 10 years!!\nInstagram ➤ https://www.instagram.com/theodd1sout/\nTikTok ➤ https://www.tiktok.com/@theoddtiktoksout\nTwitter ➤ https://twitter.com/theodd1sout\n\nART TEAM:\nEmilee Dummer ➤ https://www.instagram.com/edummerart/\nKelly Jensen ➤ https://www.instagram.com/kelly_anne_art/\nClaire Anne ➤ https://www.instagram.com/claireanneillustration\nAmelia Rosenbalm ➤ https://www.instagram.com/galloame/\nRikikuniyuki_art ➤ https://www.instagram.com/rikikuniyuki_art/",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "ObJwJLmVgXZG0X_zyXZ4MQxosDs",
    id: "I2R0fnfRJVc",
    snippet: {
      publishedAt: "2024-09-28T19:51:31Z",
      channelId: "UCJGgP4txIUr_7JTDvOGVQrA",
      title: "What Flavor Works Best in Popsicles?",
      description:
        "Thanks to SoFi for sponsoring the video! Enter to win $10,000: https://sofi.com/ted\nSign up for SoFi’s insights or credit score monitoring feature to enter for a chance to win. No purchase necessary. See Rules for info & free entry method.\n\nSchlatt and I once again embarked on a journey to figure out what flavors work best in things. \n\nSchlatt: @jschlattLIVE \nTucker: @TuckerKeane \nVHS CAM: https://twitter.com/ModestCube\n\nFOLLOW ME\n► https://www.instagram.com/tednivison\n► https://twitter.com/TedNivison\n\n► OTHER STUFF: https://linktr.ee/tednivison\n\nAssistant Editor: https://www.instagram.com/reallyzade/\n\nHave an idea you want covered? Submit here: https://forms.gle/wzbXDHqEZZJHwz958\n\nCustom Music by Oval:  @OvalMusic  \nOutro: Pls Proceed by Baron Grand\nRoyalty Free Music by \nhttp://www.epidemicsound.com/",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/I2R0fnfRJVc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/I2R0fnfRJVc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/I2R0fnfRJVc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/I2R0fnfRJVc/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/I2R0fnfRJVc/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "Ted Nivison",
      tags: [
        "JehBerDeh",
        "TedNivison",
        "Ted",
        "Nivison",
        "Ted Nivision",
        "Nivision",
        "Nvision",
      ],
      categoryId: "23",
      liveBroadcastContent: "none",
      defaultLanguage: "en",
      localized: {
        title: "What Flavor Works Best in Popsicles?",
        description:
          "Thanks to SoFi for sponsoring the video! Enter to win $10,000: https://sofi.com/ted\nSign up for SoFi’s insights or credit score monitoring feature to enter for a chance to win. No purchase necessary. See Rules for info & free entry method.\n\nSchlatt and I once again embarked on a journey to figure out what flavors work best in things. \n\nSchlatt: @jschlattLIVE \nTucker: @TuckerKeane \nVHS CAM: https://twitter.com/ModestCube\n\nFOLLOW ME\n► https://www.instagram.com/tednivison\n► https://twitter.com/TedNivison\n\n► OTHER STUFF: https://linktr.ee/tednivison\n\nAssistant Editor: https://www.instagram.com/reallyzade/\n\nHave an idea you want covered? Submit here: https://forms.gle/wzbXDHqEZZJHwz958\n\nCustom Music by Oval:  @OvalMusic  \nOutro: Pls Proceed by Baron Grand\nRoyalty Free Music by \nhttp://www.epidemicsound.com/",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "P7nVQLbVs_4tiKDS2VBA7CA0__I",
    id: "ArStqEujA7s",
    snippet: {
      publishedAt: "2024-09-28T13:00:03Z",
      channelId: "UCPIavfNa4DTfHXDBaFOHuKA",
      title: "Gymnastics Dress to Impress ft/ Salish Matter",
      description:
        "Today my friends and I are playing gymnastics theme dress to impress in real life with guest judge Salish Matter!\n\nWant more?\nGymnast vs Cheerleader Flexibility Race - https://youtu.be/68FVXXcONsM\nFlexibility Challenge ft. Elliana, Salish Matter Jordan Matter, Britt & more! - https://youtu.be/ZyXEFG4vuak\n\nSUBSCRIBE\n@annamcnulty\n@AnnaMcNultyStretches\n@AnnaMcNultyShorts\n@jordanmatter\n@jackpayne\n@Affafy\n@elenashinohara\n@mmgymsisters \n\nBusiness Inquires: anna.mcnulty@night.co",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/ArStqEujA7s/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/ArStqEujA7s/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/ArStqEujA7s/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/ArStqEujA7s/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/ArStqEujA7s/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "Anna McNulty",
      tags: [
        "Anna mcnulty",
        "Salish matter",
        "dress to impress",
        "Jordan matter",
        "gymnastics",
      ],
      categoryId: "24",
      liveBroadcastContent: "none",
      defaultLanguage: "en",
      localized: {
        title: "Gymnastics Dress to Impress ft/ Salish Matter",
        description:
          "Today my friends and I are playing gymnastics theme dress to impress in real life with guest judge Salish Matter!\n\nWant more?\nGymnast vs Cheerleader Flexibility Race - https://youtu.be/68FVXXcONsM\nFlexibility Challenge ft. Elliana, Salish Matter Jordan Matter, Britt & more! - https://youtu.be/ZyXEFG4vuak\n\nSUBSCRIBE\n@annamcnulty\n@AnnaMcNultyStretches\n@AnnaMcNultyShorts\n@jordanmatter\n@jackpayne\n@Affafy\n@elenashinohara\n@mmgymsisters \n\nBusiness Inquires: anna.mcnulty@night.co",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "PvSawVQYNZa1cYDBTHDCtyksArg",
    id: "V9PVRfjEBTI",
    snippet: {
      publishedAt: "2024-09-27T15:00:38Z",
      channelId: "UCDGmojLIoWpXok597xYo8cg",
      title: "Billie Eilish - BIRDS OF A FEATHER (Official Music Video)",
      description:
        "Listen to HIT ME HARD AND SOFT: http://BillieEilish.lnk.to/HITMEHARDARDANDSOFT\nDownload BIRDS OF A FEATHER Live from Billie’s Amazon Music Songline performance: https://billieeilish.lnk.to/BIRDSOFAFEATHER-AMAZONDOWNLOAD \nGet tickets: https://BillieEilish.lnk.to/TourDates \n\n Follow Billie Eilish: \n\nTikTok: https://BillieEilish.lnk.to/TikTok \nInstagram: https://BillieEilish.lnk.to/Instagram \nFacebook: https://BillieEilish.lnk.to/Facebook \nTwitter: https://BillieEilish.lnk.to/Twitter \nYouTube:    / billieeilish   \nWhatsApp: https://BillieEilish.lnk.to/WhatsApp \nEmail: https://BillieEilish.lnk.to/SignUp \nStore: https://BillieEilish.lnk.to/Store \nCell: +1 (310) 807-3956\n\nMusic video by Billie Eilish performing BIRDS OF A FEATHER.© 2024 Darkroom/Interscope Records",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/V9PVRfjEBTI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/V9PVRfjEBTI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/V9PVRfjEBTI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/V9PVRfjEBTI/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/V9PVRfjEBTI/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "BillieEilishVEVO",
      tags: ["Billie Eilish", "Darkroom/Interscope Records", "Alternative"],
      categoryId: "10",
      liveBroadcastContent: "none",
      localized: {
        title: "Billie Eilish - BIRDS OF A FEATHER (Official Music Video)",
        description:
          "Listen to HIT ME HARD AND SOFT: http://BillieEilish.lnk.to/HITMEHARDARDANDSOFT\nDownload BIRDS OF A FEATHER Live from Billie’s Amazon Music Songline performance: https://billieeilish.lnk.to/BIRDSOFAFEATHER-AMAZONDOWNLOAD \nGet tickets: https://BillieEilish.lnk.to/TourDates \n\n Follow Billie Eilish: \n\nTikTok: https://BillieEilish.lnk.to/TikTok \nInstagram: https://BillieEilish.lnk.to/Instagram \nFacebook: https://BillieEilish.lnk.to/Facebook \nTwitter: https://BillieEilish.lnk.to/Twitter \nYouTube:    / billieeilish   \nWhatsApp: https://BillieEilish.lnk.to/WhatsApp \nEmail: https://BillieEilish.lnk.to/SignUp \nStore: https://BillieEilish.lnk.to/Store \nCell: +1 (310) 807-3956\n\nMusic video by Billie Eilish performing BIRDS OF A FEATHER.© 2024 Darkroom/Interscope Records",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "q212ErsCdr9GmRC5CE7fdF4c6d8",
    id: "owTOEmjswmQ",
    snippet: {
      publishedAt: "2024-09-28T13:21:15Z",
      channelId: "UC6Ov32gNPTKAa7-seHTl8Xw",
      title: "Hurricane or Tropical Storm Threat Again...",
      description:
        "Right where Helene Formed! In this video, the new Hurricane potential and what this means for the Caribbean and Gulf of Mexico.",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/owTOEmjswmQ/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/owTOEmjswmQ/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/owTOEmjswmQ/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/owTOEmjswmQ/sddefault.jpg",
          width: 640,
          height: 480,
        },
      },
      channelTitle: "Mr. Weatherman",
      categoryId: "28",
      liveBroadcastContent: "none",
      defaultLanguage: "en-US",
      localized: {
        title: "Hurricane or Tropical Storm Threat Again...",
        description:
          "Right where Helene Formed! In this video, the new Hurricane potential and what this means for the Caribbean and Gulf of Mexico.",
      },
      defaultAudioLanguage: "en-US",
    },
  },
  {
    kind: "youtube#video",
    etag: "0fkt4OUK6I8aRcacyF77-4zN-8c",
    id: "GdvTpLZmSno",
    snippet: {
      publishedAt: "2024-09-29T02:10:48Z",
      channelId: "UCSZbXT5TLLW_i-5W8FZpFsg",
      title:
        "Inter Miami vs. Charlotte FC | Messi Banger! | Full Match Highlights | September 28, 2024",
      description:
        "📺 Watch every match with MLS Season Pass on Apple TV: http://apple.co/MLS\n\nThe 🐐 plays here: https://www.mlssoccer.com/messi/\n\n➡️ Subscribe Now: https://www.youtube.com/c/mls\n\n➡️ Follow us on:\n- TikTok: https://www.tiktok.com/@mls?lang=en\n- Instagram: http://instagram.com/mls\n- Twitter: https://twitter.com/MLS\n- Like us on Facebook: http://www.facebook.com/MLS\n\n➡️ Para Español:\n- Instagram: http://instagram.com/mlses\n- Twitter: https://twitter.com/MLSes\n- Facebook: facebook.com/espanol.mls\n\nFor more information about MLS, go to the league's official website: http://www.MLSsoccer.com, en español http://www.MLSes.com\n\n#mls #highlights #mlsseasonpass #soccer #futbol #intermiami #charlottefc",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/GdvTpLZmSno/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/GdvTpLZmSno/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/GdvTpLZmSno/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/GdvTpLZmSno/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/GdvTpLZmSno/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "Major League Soccer",
      tags: ["MIA vs. Charlotte FC", "PLAYS"],
      categoryId: "17",
      liveBroadcastContent: "none",
      localized: {
        title:
          "Inter Miami vs. Charlotte FC | Messi Banger! | Full Match Highlights | September 28, 2024",
        description:
          "📺 Watch every match with MLS Season Pass on Apple TV: http://apple.co/MLS\n\nThe 🐐 plays here: https://www.mlssoccer.com/messi/\n\n➡️ Subscribe Now: https://www.youtube.com/c/mls\n\n➡️ Follow us on:\n- TikTok: https://www.tiktok.com/@mls?lang=en\n- Instagram: http://instagram.com/mls\n- Twitter: https://twitter.com/MLS\n- Like us on Facebook: http://www.facebook.com/MLS\n\n➡️ Para Español:\n- Instagram: http://instagram.com/mlses\n- Twitter: https://twitter.com/MLSes\n- Facebook: facebook.com/espanol.mls\n\nFor more information about MLS, go to the league's official website: http://www.MLSsoccer.com, en español http://www.MLSes.com\n\n#mls #highlights #mlsseasonpass #soccer #futbol #intermiami #charlottefc",
      },
    },
  },
  {
    kind: "youtube#video",
    etag: "mW0gA86hEnm51V3VGbNSBiv6STA",
    id: "K1Kg-QOq1pA",
    snippet: {
      publishedAt: "2024-09-28T11:40:40Z",
      channelId: "UC1Gz1YkPBoLzQSBKbswBHAw",
      title:
        "TVA: Nolichucky Dam failure is imminent, could cause life-threatening flooding",
      description:
        "TVA: Nolichucky Dam failure is imminent, could cause life-threatening flooding",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/K1Kg-QOq1pA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/K1Kg-QOq1pA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/K1Kg-QOq1pA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/K1Kg-QOq1pA/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/K1Kg-QOq1pA/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "WJHL",
      tags: ["video"],
      categoryId: "25",
      liveBroadcastContent: "none",
      localized: {
        title:
          "TVA: Nolichucky Dam failure is imminent, could cause life-threatening flooding",
        description:
          "TVA: Nolichucky Dam failure is imminent, could cause life-threatening flooding",
      },
      defaultAudioLanguage: "en",
    },
  },
  {
    kind: "youtube#video",
    etag: "EuE2m5U2Xhf8zaIzKFj5EeCWxZ0",
    id: "IqttVycDj0s",
    snippet: {
      publishedAt: "2024-09-27T23:22:17Z",
      channelId: "UCMOfmSEQhJnihhtQJhiYe4g",
      title:
        "Gatlinburg & Pigeon Forge Hurricane Helene Update Tour | How Bad Is The Damage?",
      description:
        "We hope you find this tour of Pigeon Forge & Gatlinburg Tennessee helpful!  Thankfully hurricane Helene didn't cause too much Pigeon Forge or Gatlinburg flooding.   Neighboring Newport, TN has had much more challenges along with I-40 near the North Carolina & Tennessee border.  Here is the latest update ► https://youtu.be/oVYlgckBvsU\n\nHere is a look at Dollywood Flooded earlier this year ►https://youtu.be/j_IVD6REdUU\n\n🌎 Join Our Next Adventure & SUBSCRIBE Here ► https://bit.ly/3AI411H 🔔\n\n⏰  Tik Tok | https://tiktok.com/@AIOTfamily\n📸  Instagram | http://instagram.com/AIOTfamily\n👤  Facebook | http://facebook.com/AIOTfamily\n🐦 Twitter | https://twitter.com/AIOTfamily\n\n📬  Contact Us\nAdvOutThere@gmail.com\nRyan & Brie\nPO BOX 4975\nSevierville, TN 37864\n\n#gatlinburg #pigeonforge #sevierville #hurricane #smokymountains \n\nAs we take a drive through pigeon forge tennessee we check for any pigeon forge flooding and see how the pigeon forge crowds are.  We then drive into Gatlinburg Tennessee to see how bad the Gatlinburg flooding is and see the Gatlinburg crowd levels after hurricane helene.  Thankfully there was not too smoky mountain flooding and most of the major roads were able to remain open.  We also check out the Dollywood crowds and hopefully give you peace of mind about your upcoming visit!",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/IqttVycDj0s/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/IqttVycDj0s/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/IqttVycDj0s/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/IqttVycDj0s/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/IqttVycDj0s/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "Adventure Is Out There",
      tags: [
        "gatlinburg tennessee",
        "pigeon forge tennessee",
        "gatlinburg flood",
        "pigeon forge flood",
        "hurricane helene",
        "gatlinburg hurricane",
        "smoky mountains flooding",
        "gatlinburg crowds",
        "gatlinburg fire",
        "gatlinburg crowd levels",
        "pigeon forge crowds",
        "how busy is gatlinburg",
        "the old mill pigeon forge",
        "gatlinburg rain",
        "gatlinburg vlog",
        "downtown gatlinburg",
        "roads closed",
        "gatlinburg news",
        "pigeon forge flooding",
        "gatlinburg tennessee flooding",
        "hurricane helene flooding",
        "pigeon forge weather",
        "storm",
      ],
      categoryId: "19",
      liveBroadcastContent: "none",
      defaultLanguage: "en",
      localized: {
        title:
          "Gatlinburg & Pigeon Forge Hurricane Helene Update Tour | How Bad Is The Damage?",
        description:
          "We hope you find this tour of Pigeon Forge & Gatlinburg Tennessee helpful!  Thankfully hurricane Helene didn't cause too much Pigeon Forge or Gatlinburg flooding.   Neighboring Newport, TN has had much more challenges along with I-40 near the North Carolina & Tennessee border.  Here is the latest update ► https://youtu.be/oVYlgckBvsU\n\nHere is a look at Dollywood Flooded earlier this year ►https://youtu.be/j_IVD6REdUU\n\n🌎 Join Our Next Adventure & SUBSCRIBE Here ► https://bit.ly/3AI411H 🔔\n\n⏰  Tik Tok | https://tiktok.com/@AIOTfamily\n📸  Instagram | http://instagram.com/AIOTfamily\n👤  Facebook | http://facebook.com/AIOTfamily\n🐦 Twitter | https://twitter.com/AIOTfamily\n\n📬  Contact Us\nAdvOutThere@gmail.com\nRyan & Brie\nPO BOX 4975\nSevierville, TN 37864\n\n#gatlinburg #pigeonforge #sevierville #hurricane #smokymountains \n\nAs we take a drive through pigeon forge tennessee we check for any pigeon forge flooding and see how the pigeon forge crowds are.  We then drive into Gatlinburg Tennessee to see how bad the Gatlinburg flooding is and see the Gatlinburg crowd levels after hurricane helene.  Thankfully there was not too smoky mountain flooding and most of the major roads were able to remain open.  We also check out the Dollywood crowds and hopefully give you peace of mind about your upcoming visit!",
      },
      defaultAudioLanguage: "en",
    },
  },
];

export default getProjectMockData(videoMockData);
