import dayjs from "dayjs";
import { ApiResponse } from "./common.model";

export type BasicInfomation = {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    age: string;
};

export enum ContactAddressType {
    MAILING = "Mailing",
    WORK = "Work",
}

export type ContactAddress = {
    country: string;
    city: string;
    street: string;
    postalCode?: string;
    type: ContactAddressType;
};

export type ContactEmail = {
    address: string;
    type: ContactPurposeType;
    isPreferred: PreferContactOption;
};

export enum ContactPurposeType {
    PERSONAL = "Personal",
    WORK = "Work",
}

export enum PreferContactOption {
    YES = "Yes",
    NO = "No",
}

export type ContactPhone = {
    number: string;
    type: ContactPurposeType;
    isPreferred: PreferContactOption;
};

export type ContactInformation = {
    addresses: ContactAddress[];
    emails: ContactEmail[];
    phones: ContactPhone[];
};

export enum IdentificationDocumentType {
    PASSPORT = "Passport",
    NATIONAL_ID = "National ID Card",
    DRIVER_LICENSE = "Driver License",
}

export type IdentificationDocument = {
    type: IdentificationDocumentType;
    expiryDate: string;
    file: File | null;
};

export enum OccupationTitle {
    UNEMPLOYED = "Unemployed",
    ENGINEER = "Engineer",
    TEACHER = "Teacher",
    DOCTOR = "Doctor",
    OTHERS = "Others",
}

export type Occupation = {
    title: OccupationTitle;
    fromDate: string;
    toDate: string;
};

export type PersonalInforDetailsFormValues = {
    contactInformation: ContactInformation;
    basicInformation: BasicInfomation;
    identificationDocuments: IdentificationDocument[];
    occupations: Occupation[];
};

export type PersonalInformation = {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    address: string;
    phoneNumber: string;
    organization: string;
    department: string;
    email: string;
    birthday: string;
    role: string;
    postalCode: string;
};

export interface GetPersonalInformationResponse extends ApiResponse<PersonalInformation> {}

export type BasicInformationDTO = {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
};

export type ContactAddressDTO = {
    country: string;
    city: string;
    street: string;
    postalCode?: string;
    type: ContactAddressType;
};

export type ContactEmailDTO = {
    address: string;
    type: ContactPurposeType;
    isPreferred: boolean;
};

export type ContactPhoneDTO = {
    number: string;
    type: ContactPurposeType;
    isPreferred: boolean;
};

export type ContactInformationDTO = {
    addresses: ContactAddressDTO[];
    emails: ContactEmailDTO[];
    phones: ContactPhoneDTO[];
};

export type IdentificationDocumentDTO = {
    type: IdentificationDocumentType;
    expiryDate: string;
    fileUrl: string;
};

export type OccupationDTO = {
    title: OccupationTitle;
    fromDate: string;
    toDate: string;
};

export type PersonalInformationDTO = {
    contactInformation: ContactInformationDTO;
    basicInformation: BasicInformationDTO;
    identificationDocuments: IdentificationDocumentDTO[];
    occupations: OccupationDTO[];
};

export interface GetPersonalInfoDetailsResponse extends ApiResponse<PersonalInformationDTO> {}

export interface UpdatePersonalInfoDetailsRequest {
    clientId: string;
    body: PersonalInforDetailsFormValues;
}

export interface UpdatePersonalInfoDetailsResponse extends ApiResponse<PersonalInformationDTO> {}

export function toEmailsFormValues(emailDTOs: ContactEmailDTO[]): ContactEmail[] {
    return emailDTOs.map((emailDTO) => ({
        address: emailDTO.address,
        isPreferred: toPreferContactOption(emailDTO.isPreferred),
        type: emailDTO.type,
    }));
}

export function toPhonesFormValues(phoneDTOs: ContactPhoneDTO[]): ContactPhone[] {
    return phoneDTOs.map((phoneDTO) => ({
        number: phoneDTO.number,
        isPreferred: toPreferContactOption(phoneDTO.isPreferred),
        type: phoneDTO.type,
    }));
}

export function toBasicInformationFormValue(basicInfoDTO: BasicInformationDTO): BasicInfomation {
    const age = dayjs().diff(dayjs(basicInfoDTO.dateOfBirth), "year");

    return {
        firstName: basicInfoDTO.firstName,
        lastName: basicInfoDTO.lastName,
        middleName: basicInfoDTO.middleName,
        dateOfBirth: basicInfoDTO.dateOfBirth,
        age: age.toString(),
    };
}

export function toDocumentsFormValues(documentDTOs: IdentificationDocumentDTO[]): IdentificationDocument[] {
    return documentDTOs.map((documentDTO) => ({
        type: documentDTO.type,
        expiryDate: documentDTO.expiryDate,
        file: null,
    }));
}

export function toPersonalInfoDetailsFormValues(
    personalInfoDTO: PersonalInformationDTO,
): PersonalInforDetailsFormValues {
    return {
        contactInformation: {
            addresses: personalInfoDTO.contactInformation.addresses,
            emails: toEmailsFormValues(personalInfoDTO.contactInformation.emails),
            phones: toPhonesFormValues(personalInfoDTO.contactInformation.phones),
        },
        basicInformation: toBasicInformationFormValue(personalInfoDTO.basicInformation),
        identificationDocuments: toDocumentsFormValues(personalInfoDTO.identificationDocuments),
        occupations: personalInfoDTO.occupations,
    };
}

function toPreferContactOption(value: boolean): PreferContactOption {
    return value ? PreferContactOption.YES : PreferContactOption.NO;
}
