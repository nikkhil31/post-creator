import ImageKit from "imagekit"
import { SearchResult } from "./model"
import { UploadResponse } from "imagekit/dist/libs/interfaces"

export const fetchAndUploadGoogleImages = async (
    keyword: string,
    numResults: number = 10,
): Promise<string[]> => {
    const baseUrl = "https://www.googleapis.com/customsearch/v1"
    const params = new URLSearchParams({
        q: keyword,
        cx: process.env.GOOGLE_CX as string,
        key: process.env.GOOGLE_KEY as string,
        searchType: "image",
        num: numResults.toString(),
    })

    try {
        const response = await fetch(`${baseUrl}?${params.toString()}`)
        if (!response.ok) {
            throw new Error(`Google API error: ${response.status} ${response.statusText}`)
        }
        const data: SearchResult = await response.json()
        if (!data.items || data.items.length === 0) {
            throw new Error("No images found")
        }
        const imageUrls = data.items.map((item) => item.link)

        const uploadedImages = await uploadImagesToImageKit(imageUrls)

        const successfulUploads = uploadedImages
            .filter((image): image is UploadResponse => !!image && 'url' in image)
            .map((image) => image.url)

        if (successfulUploads.length === 0) {
            throw new Error("Failed to upload any images to ImageKit")
        }

        return successfulUploads
    } catch (error) {
        console.error("Error in fetchAndUploadGoogleImages:", error)
        throw error
    }
}

export const createChatCompletion = async (keyword: string): Promise<string[]> => {
    const url = "https://api.openai.com/v1/chat/completions"
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
    }
    const body = JSON.stringify({
        model: "gpt-3.5-turbo-1106",
        messages: [
            {
                role: "system",
                content: `
        Act as Content writer, can you give me 10 titles based on given keyword.
        the response should be in array based json. strictly return only array, and strictly don't add any number series before title.

        Keyword: ${keyword}
    `,
            },
        ],
        temperature: 0.7,
    })

    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body,
        })

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
            throw new Error("Invalid response from OpenAI API")
        }

        const titles = JSON.parse(data.choices[0].message.content)
        if (!Array.isArray(titles) || titles.length === 0) {
            throw new Error("Failed to generate titles")
        }

        return titles
    } catch (error) {
        console.error("Error in createChatCompletion:", error)
        throw error
    }
}

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
})

async function uploadImagesToImageKit(imagePaths: string[]): Promise<(UploadResponse | null)[]> {
    const uploadPromises = imagePaths.map(async (path) => {
        try {
            const fileName = path.split("/").pop() || "image.jpg"
            const response = await imagekit.upload({
                file: path,
                fileName: fileName,
            })
            console.log(`Successfully uploaded ${fileName}`)
            return response
        } catch (error) {
            console.error(`Error uploading ${path}:`, error)
            return null
        }
    })

    return Promise.all(uploadPromises)
}