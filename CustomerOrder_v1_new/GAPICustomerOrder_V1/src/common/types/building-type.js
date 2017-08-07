import Enum from 'enum';
const BuildingType = new Enum({
	'NotDefined': 0,
	'Detach': 1,
	'SemiDetach': 2,
	'Terraced': 3,
	'FlatGround': 4,
	'FlatSecond': 5,
	'Mobile': 6,
	'Office': 7
});
export default BuildingType;