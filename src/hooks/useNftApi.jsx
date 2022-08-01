import React from 'react'
import { useSelector } from 'react-redux'
import { securedAPI } from '../services/api'
import { useMutation, useQuery } from 'react-query'

const size = 10

const getList = ({ type, page, orderBy = 'desc' },token) => securedAPI(token).post(`/api/nft/list?type=${type}&page=${page}&orderBy=${orderBy}&size=${size}`).then(res => res.data)

const getDetail = ({ contactAddress, tokenId },token) => securedAPI(token).get(`/api/nft/detail?contact_address${contactAddress}&token_id=${tokenId}`).then(res => res.data)

const fetchLike = (data, token) => securedAPI(token).post(`/api/nft/like`, data)

const fetchUnlike = (data, token) => securedAPI(token).post(`/api/nft/dislike`, data)

const useNftAPI = ({ 
    isGetList = false, 
    isGetDetail = false , 
    type = 'COLLECTED', 
    page = 1, 
    orderBy = 'desc'
}) => {
    const { token } = useSelector(store => store.auth)

    const { 
        data: list, 
        refetch: refetchList, 
        isLoading: loadingList, 
        error 
    } = useQuery(
        'get-nft-list',
        () => getList({ type, page, orderBy },token),{
        enabled: !!isGetList
    })
    
    const { 
        data: detail, 
        refetch: refetchDetail, 
        isLoading: loadingDetail, 
        error: errorDetail 
    } = useQuery(
        `get-nft-detail`,
        (payload) => getDetail(payload, token),{
        enabled: !!isGetDetail
    })

    const mutationLike = useMutation((data) => fetchLike(data, token),{
    })

    const mutationDislike = useMutation((data) => fetchUnlike(data, token),{
    })

    return {
        postLike: mutationLike,
        postDislike: mutationDislike,
        detail,
        refetchDetail,
        loadingDetail,
        errorDetail,
        list,
        refetchList,
        loadingList,
        error
    }
}

export default useNftAPI
