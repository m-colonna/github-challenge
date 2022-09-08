import axios from 'axios'
import { format, subWeeks } from 'date-fns'
import { useState } from 'react'
import { useCurrentFetchState } from '../currentFetchContext'
import { CurrentState } from '../styles/variables'
import { RepositoriesResponseType } from '../utils/repositories.types'

const repositoriesUrl = (language: string) => {
  // Use passed language prop for filtering
  const languageQuery = ` language:${language}`

  // Get week range to set weekly repos list
  const weekRange = format(subWeeks(new Date(), 1), 'yyyy-MM-dd')

  // Returns URL with the passed parameters on the query
  return `https://api.github.com/search/repositories?q=created:>${weekRange}${languageQuery}&sort=stars&order=desc`
}

// Fetches the data from the GitHub repository API and sets the current fetch status
export function useRepositoriesData() {
  const { setFetchState } = useCurrentFetchState()
  const [repositories, setRepositories] = useState<RepositoriesResponseType>()
  const getRepositories = async (language: string) => {
    try {
      setFetchState({ currentState: CurrentState.Loading })
      const res = await axios.get(repositoriesUrl(language))
      const resData = res.data

      setRepositories(resData)

      setFetchState({ currentState: CurrentState.Success })
    } catch (err) {
      setFetchState({ currentState: CurrentState.Error })
    }
  }

  return { repositories, getRepositories }
}
