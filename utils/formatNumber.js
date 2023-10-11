export function formatNumber(number){
	if(isNaN(+number)){
		return 0
	}
	if(typeof number != 'number'){
		number = +number
	}
	if(number < 10000){
		return number
	}else	if(number >= 10000 && number < 99999999 ){
		const result = (number / 10000).toFixed(1)
		if(result.split('.')[1] == '0'){
			return result.split('.')[0] + '万'
		}else{
			return result + '万'
		}
	}else{
		const result = (number / 100000000).toFixed(1)
		if(result.split('.')[1] == '0'){
			return result.split('.')[0] + '亿'
		}else{
			return result + '亿'
		}
	}
}