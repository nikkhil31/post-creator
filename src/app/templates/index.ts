import post1 from "@/app/templates/post-1.json"
import { ITemplates } from "../core/model"

export const templates: ITemplates = {
    Posts: {
        layouts: [post1],
        width: 1080,
        height: 1080,
    },
    Stories: {
        layouts: [],
        width: 1080,
        height: 1920,
    },
}
