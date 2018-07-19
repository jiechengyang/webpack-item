'use strict' 
import _ from 'lodash'


function component()
{
	var element = document.createElement('div')
	element.innerHTML = 'webpack综合应用'
	
	return element
}

document.body.appendChild(component())