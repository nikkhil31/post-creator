import { FabricObject, FabricObjectProps } from "fabric"

export interface SearchResult {
    items: {
        link: string
        image: {
            thumbnailLink: string
        }
    }[]
}

export interface IGetImagesBasedOnInput {
    layouts: any[]
    data: {
        images: string[]
        titles: string[]
    }
    n: number
}

export interface ILayout {
    layouts: { objects: any[] }[]
    width: number
    height: number
}

export interface ITemplates {
    Posts: ILayout
    Stories: ILayout
}

export interface IImageGrid {
    templates: ILayout
    data: {
        images: string[]
        titles: string[]
    }
}
