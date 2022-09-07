import axios from 'axios'
import { format, subWeeks } from 'date-fns'
import { useState } from 'react'
import { useCurrentStatus } from '../currentStateContext'
import { CurrentState } from '../styles/variables'
import { RepositoriesResponseType } from '../utils/repositories.types'

const repositoriesUrl = (language: string) => {
  const languageQuery = ` language:${language}`
  const weekRange = format(subWeeks(new Date(), 1), 'yyyy-MM-dd')

  return `https://api.github.com/search/repositories?q=created:>${weekRange}${languageQuery}&sort=stars&order=desc`
}

export function useRepositoriesData() {
  const { setFetchState } = useCurrentStatus()
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
