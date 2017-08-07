import Enum from 'enum';
const SubstitutionOption = new Enum({
	'DoNotSubstitute':1,
	'LookForThisItemInstead':2,
	'FindSuitableAlternative':3
});
export default SubstitutionOption;
