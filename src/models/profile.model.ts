export type BasicInfomation = {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    age: string;
};

export type ContactAddress = {
    country: string;
    city: string;
    street: string;
    postalCode?: string;
    type: string;
};

export type ContactEmail = {
    address: string;
    type: "personal" | "work";
    isPreferred: "yes" | "no";
};

export type ContactPhone = {
    number: string;
    type: "personal" | "work";
    isPreferred: "yes" | "no";
};

export type ContactInformation = {
    addresses: ContactAddress[];
    emails: ContactEmail[];
    phones: ContactPhone[];
};

export type PersonalInformationFormValues = {
    contactInformation: ContactInformation;
    basicInformation: BasicInfomation;
};
