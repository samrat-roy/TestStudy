import Enum from 'enum';
const ProductType = new Enum({
	'LooseQuantity': 1,
	'LooseWeight': 2,
	'Single': 3,
	'VarPack': 4,
	'CatchWeight': 5
});

export default ProductType; 