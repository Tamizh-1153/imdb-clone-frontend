import {
  Box,
  Button,
  Group,
  Input,
  InputWrapper,
  Modal,
  Select,
  Textarea,
} from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { addProducerToServer, validateGender, validateParagraph, validateString } from "../../api/posts"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { addProducer } from "../../features/user/userSlice"

const AddProducer = ({ producerOpen, setProducerOpen }) => {

  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const form = useForm({
    initialValues: {
      name: "",
      gender: "",
      dateOfBirth: "",
      bio: "",
    },

    validate: {
      name: (value) => validateString(value),
      gender: (value) => validateGender(value),
      dateOfBirth: (value) => validateString(value),
      bio: (value) => validateParagraph(value),
    },
  })

  const { name, gender, dateOfBirth, bio } = form.values

  const {mutate} = useMutation({
    mutationFn: (producerDetails)=> addProducerToServer(producerDetails),
    onSuccess:(data)=>{
        toast.success('Producer added successfully')
        form.reset()
        dispatch(addProducer(data))
        queryClient.invalidateQueries({ queryKey: ["allProducers"] })
        setProducerOpen(false)
    }
  })

  const handleSubmit = () => {
    const { hasErrors } = form.validate()
    if (!hasErrors) {
      let producerDetails= {
        name: name,
        gender: gender,
        dateOfBirth: dateOfBirth,
        bio: bio,
      }
      mutate(producerDetails)
    }
  }


  return (
    <>
      <Modal
        opened={producerOpen}
        onClose={() => setProducerOpen(false)}
        title="Add Producer"
        centered
      >
        <Box>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <InputWrapper mt={"1rem"} withAsterisk label="Name">
              <Input
                mt={".3rem"}
                placeholder="Producer name"
                {...form.getInputProps("name")}
              />
            </InputWrapper>
            <InputWrapper mt={"1rem"} withAsterisk label="Gender">
              <Select
                placeholder="Select Gender"
                data={["Male", "Female"]}
                {...form.getInputProps("gender")}
              />
            </InputWrapper>
            <InputWrapper mt={"1rem"} withAsterisk label="Date of birth">
              <DateInput
                mt={".3rem"}
                withAsterisk
                valueFormat="DD/MM/YYYY"
                placeholder="Pick birth date"
                {...form.getInputProps("dateOfBirth")}
              />
            </InputWrapper>
            <InputWrapper mt={".7rem"} withAsterisk label="Bio">
              <Textarea
                mt={".3rem"}
                autosize
                withAsterisk
                placeholder="About actor..."
                minRows={2}
                {...form.getInputProps("bio")}
              />
            </InputWrapper>
            <Group mt={".5rem"} justify="center">
              <Button type="submit">Add</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default AddProducer
