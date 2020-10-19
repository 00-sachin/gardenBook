
import react from 'react';
import '../App.css';


var itemList = [
{
	title: 'Task1',
	prority: 'Important',
	status: 'Done'
},
{
	title: 'Task2',
	prority: 'Important',
	status: 'Done'
},
{
	title: 'Task3',
	prority: 'Important',
	status: 'Done'
}]

function Item () {
	return ( itemList.map((singleItem) => {
		return (
			<div className = 'singleTask'>
			<h2>{singleItem.title}</h2>
			<p>{singleItem.priority}</p>
			<p>{singleItem.status}</p>
			</div>
			);
	})
		)

};

export default Item;