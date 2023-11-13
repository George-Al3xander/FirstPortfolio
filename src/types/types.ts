
export type links = {
    email: string,
    github: string,
    linkedin: string,
    id: string
}

export type description = {
    description: string,
    id: string
}

export type linksDb = [
    links,
    description
]

export type skill = {
    id: string,
    icon: string,
    name: string,
    order: number
}


export type project = {
    description: string,
    isFullstack?: boolean,
    name: string,
    url_github: string,
    url_preview: string,
    id: string,
    img: string  
}

export type picture = {
    name: "pic_header" | "pic_footer",
    url: string
}