import { Button, Container, Group, Input, InputWrapper, Loader, Modal, MultiSelect, Select, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import React from "react"
import { updateMovieToServer, validateParagraph, validateString } from "../../api/posts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"


const EditMovie = ({id,producerName,producers,actors, actorNames,movie, open, setOpen }) => {

if(!movie){
  return (
    <Container>
      <Loader
        style={{ width: "100%", justifyContent: "center" }}
        color="blue"
        size="xl"
        type="dots"
      />
    </Container>
  )
}
  const queryClient = useQueryClient()
      const form = useForm({
        initialValues: {
          title: movie?.title,
          plot: movie?.plot,
          actor: actorNames,
          producer: producerName?.name,
        },

        validate: {
          title: (value) => validateString(value),
          yearOfRelease: (value) => validateString(value),
          plot: (value) => validateParagraph(value),
          producer: (value) => validateString(value),
        },
      })

      const { title,  plot, producer, actor } = form.values

      const { mutate } = useMutation({
        mutationFn: (movieDetails) => updateMovieToServer(id,movieDetails),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey:['allMovies']})
          toast.success("Movie updated successfully")
          // form.reset()
          setOpen(false)
        },
      })

      const handleSubmit = () => {
        const { hasErrors } = form.validate()
        if (!hasErrors) {
          let actorsId = []

          actor.forEach((actorName) => {
            const matchingActor = actors?.find((item) => item.name == actorName)
            if (matchingActor) {
              actorsId.push(matchingActor._id)
            }
          })
          const producerId = producers.find((item) => item.name == producer)
          let movieDetails = {
            title: title,
            plot: plot,
            actors: actorsId,
            producer: producerId._id,
          }
          mutate(movieDetails)
        }
      }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Edit Movie">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <InputWrapper label="Title">
            <Input {...form.getInputProps("title")} />
          </InputWrapper>
          <InputWrapper label="Plot">
            <Textarea
              autosize
              withAsterisk
              placeholder="Movie plot..."
              minRows={4}
              {...form.getInputProps("plot")}
            />
          </InputWrapper>
          <InputWrapper label="Actors">
            <MultiSelect
              style={{ width: "50%" }}
              mt={".3rem"}
              data={actors?.map((actor) => actor.name)}
              {...form.getInputProps("actor")}
            />
          </InputWrapper>
          <InputWrapper label="Producer">
            <Select
              style={{ width: "50%" }}
              mt={".3rem"}
              data={producers?.map((producer) => producer.name)}
              {...form.getInputProps("producer")}
            />
          </InputWrapper>
          <Group mt={'1rem'} justify="center">
            <Button type="submit">Update</Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}

export default EditMovie
