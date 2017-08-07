import types from '../../../../common/types';

exports.mapPersonalDetails = function (personalDetails) {
    let personalInfo = types.getCustomerAttributes();
    personalInfo.DxshId = personalDetails.dxshCustomerID;
    personalInfo.Email = personalDetails.Email;
    personalInfo.Forename = personalDetails.FirstName;
    personalInfo.Id = personalDetails.CustomerNumber;
    personalInfo.Initials = personalDetails.Initials;
    personalInfo.IsStaffMember = personalDetails.IsStaffMember;
    personalInfo.Surname = personalDetails.Surname;
    personalInfo.Title = personalDetails.Title;
    return personalInfo;
};