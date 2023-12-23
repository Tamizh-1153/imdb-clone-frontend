import { Button } from "@mantine/core"
import React, { useEffect, useRef, useState } from "react"
import "./uploadPoster.css"

const UploadPoster = ({imageURL,setImageURL}) => {
  
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dytqxtsrc",
        uploadPreset: "ahoqfuhl",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url)
        }
      }
    )
  }, [])

  return (
    <div>
      {!imageURL ? (
        <Button
          color="gray"
          onClick={() => widgetRef.current?.open()}
          mt={".3rem"}
        >
          Upload
        </Button>
      ) : (
        <img
          onClick={() => widgetRef.current?.open()}
          className="poster"
          src={imageURL}
          alt="loading"
        />
      )}
    </div>
  )
}

export default UploadPoster
