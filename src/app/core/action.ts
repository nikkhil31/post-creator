"use server"

import { createChatCompletion, fetchAndUploadGoogleImages } from "./services"

export async function keyword(prevState: any, formData: FormData) {
    const search = (formData.get("search") as string) || ""

    try {
        const [images, titles] = await Promise.all([
            fetchAndUploadGoogleImages(search),
            createChatCompletion(search),
        ])

        if (!images.length) {
            throw new Error("Failed to fetch or upload images")
        }

        if (!titles || !Array.isArray(titles) || titles.length === 0) {
            throw new Error("Failed to generate titles")
        }

        return {
            data: {
                images,
                titles,
            },
            error: "",
        }
    } catch (error) {
        console.error("Error in keyword function:", error)
        return {
            data: {
                images: [],
                titles: [],
            },
            error: (error as Error).message || "An unexpected error occurred",
        }
    }
}
