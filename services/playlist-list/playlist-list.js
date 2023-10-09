import {api} from '../index.js'
export function getPlaylistCatList(data){
	return api.get({url:'/playlist/catlist',data})
}