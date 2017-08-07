import Enum from 'enum';
const CouponRewardType = new Enum({
	1 :'Monetory',
	2 :'ClubcardPoints',
	3 :'FreeDelivery',
	4 :'FreeCollect',
	5 :'FixedDelivery',
	6 :'FixedCollect',
	7 :'GreenClubcardPoints'
});
export default CouponRewardType;