import axios from "./axios"

const url = 'Category'

export const getCategories = async () => {
    const response = await axios.get(url)
    return response.data
}

export const signUp = async () => {

}