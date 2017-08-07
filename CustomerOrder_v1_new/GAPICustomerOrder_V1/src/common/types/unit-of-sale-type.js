import Enum from 'enum';
const UnitOfSaleType = new Enum({
	'Item': 1,
	'Single': 2,
	'Weighted': 3,
	'Prepacked': 4,
	'Bird': 5
});
export default UnitOfSaleType;