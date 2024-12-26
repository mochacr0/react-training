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

export type PersonalInformationFormValues = {
    contactInformation: ContactInformation;
    basicInformation: BasicInfomation;
    identificationDocuments: IdentificationDocument[];
    occupations: Occupation[];
};
