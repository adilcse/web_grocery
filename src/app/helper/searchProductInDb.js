import Fuse from 'fuse.js';
/**
 * in searches in algolia search index and gives result as an array
 * returns arrays of results
 * @param {*} value data to search in database
 */
export const searchProductInDb=(products,value)=>{
	const options = {
		shouldSort: true,
		threshold: 0.5,
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
		keys: [
			'name','description'
		]
	};
	const fuse = new Fuse(products, options);
	let result=fuse.search(value)
	let items=[];
	result.forEach(element=>{
		items.push(element.item);
	});
	return items;
}