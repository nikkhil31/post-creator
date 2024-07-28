"use client"
import React, { FC, useEffect, useState } from "react"
import * as fabric from "fabric"
import { IImageGrid } from "../core/model"
import { useFormStatus } from "react-dom"
import { Download } from "lucide-react"

const ImageGrid: FC<IImageGrid> = ({
    templates: { layouts, width, height },
    data,
}) => {
    const [canvasImages, setCanvasImages] = useState<{ [key: string]: string }>(
        {},
    )

    const { pending } = useFormStatus()

    const createImages = () => {
        if (
            data.titles.length > 0 &&
            data.images.length > 0 &&
            layouts.length > 0
        ) {
            for (
                let index = +Object.values(canvasImages).length;
                index < +Object.values(canvasImages).length + 12;
                index++
            ) {
                const layout =
                    layouts[Math.floor(Math.random() * layouts.length)]
                const title: string =
                    data.titles[Math.floor(Math.random() * data.titles.length)]
                const image: string =
                    data.images[Math.floor(Math.random() * data.images.length)]

                const canvas = new fabric.Canvas("", {
                    height,
                    width,
                })

                layout.objects = layout.objects.map((object: any) => ({
                    ...object,
                    ...(object.type === "image" && {
                        src: `${(" " + image).slice(1)}?tr=w-${
                            object.width
                        },h-${object.height},fo-auto`,
                        crossOrigin: "anonymous",
                    }),
                    ...(object.type === "textbox" && {
                        text: (" " + title).slice(1),
                    }),
                }))

                canvas.loadFromJSON(layout, function () {
                    canvas.renderAll()
                    setCanvasImages((images: any) => ({
                        ...images,
                        [index]: canvas.toDataURL(),
                    }))
                })
            }
        }
    }

    useEffect(() => {
        setCanvasImages({})
        createImages()
    }, [data])

    const handleDownload = (imageUrl: string, index: number) => {
        const link = document.createElement("a")
        link.href = imageUrl
        link.download = `image-${index + 1}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    if (pending) {
        return (
            <div className='flex justify-center items-center h-64'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900'></div>
            </div>
        )
    }

    return (
        Object.values(canvasImages).length > 0 && (
            <div className='p-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {Object.values(canvasImages).map((image, index) => {
                        const aspectRatio = width / height
                        const isSquare = Math.abs(aspectRatio - 1) < 0.01

                        return (
                            <div
                                key={index}
                                className={`relative overflow-hidden rounded-lg ${
                                    isSquare ? "aspect-square" : "aspect-[9/16]"
                                } group`}
                            >
                                <img
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    className='absolute inset-0 w-full h-full object-cover'
                                />
                                <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                                    <button
                                        onClick={() =>
                                            handleDownload(image, index)
                                        }
                                        className='p-2 bg-white rounded-full hover:bg-gray-200 transition-colors'
                                    >
                                        <Download className='w-6 h-6 text-gray-800' />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='mt-6 text-center'>
                    <button
                        type='button'
                        onClick={() => createImages()}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                    >
                        Load More
                    </button>
                </div>
            </div>
        )
    )
}

export default ImageGrid
