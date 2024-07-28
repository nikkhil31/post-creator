import post1 from "@/app/templates/post-1.json"
import post2 from "@/app/templates/post-2.json"
import story1 from "@/app/templates/story-1.json"
import story2 from "@/app/templates/story-2.json"
import { ITemplates } from "../core/model"

export const templates: ITemplates = {
    Posts: {
        layouts: [post1,post2],
        width: 1080,
        height: 1080,
    },
    Stories: {
        layouts: [story1,story2],
        width: 1080,
        height: 1920,
    },
}
