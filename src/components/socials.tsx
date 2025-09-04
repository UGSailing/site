interface SocialItem {
    icon: string;
    href: string;
    platform: string;
    name: string;
}

const socials: SocialItem[] = [
    {
        platform: "Instagram",
        href: "https://www.instagram.com/ugentsailing/",
        icon: "icon-[bi--instagram]",
        name: "@ugentsailing",
    },
    { 
        platform: "Discord", 
        href: "https://discord.gg/BmRtd6qb4z", 
        icon: "icon-[bi--discord]",
        name: "UGent Sailing",
    },
    { 
        platform: "LinkedIn", 
        href: "https://www.linkedin.com/company/ugent-sailing/posts/?feedView=all", 
        icon: "icon-[bi--linkedin]",
        name: "ugent-sailing",
    },
    { 
        platform: "Facebook", 
        href: "https://www.facebook.com/people/UGent-Sailing/61573219499660/", 
        icon: "icon-[bi--facebook]",
        name: "UGent Sailing",
    },
    { 
        platform: "Github", 
        href: "https://github.com/UGSailing", 
        icon: "icon-[bi--github]",
        name: "UGSailing",
    },
    { 
        platform: "Nextcloud", 
        href: "https://sailing.ugent.be", 
        icon: "icon-[simple-icons--nextcloud]",
        name: "sailing.ugent.be",
    }
]

export default socials;