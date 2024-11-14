import { environment } from "../../../environments/environment";

export const APIConstant = {
    classOfTrade:{
        getAllClassOfTrade: environment.apiEndPoint + 'ClassOfTrade/GetAllClassOfTrade',
        deleteClassOfTrade: environment.apiEndPoint + 'ClassOfTrade/Delete',
        getClassOfTradeById: environment.apiEndPoint + 'ClassOfTrade/GetClassOfTradeById',
        saveClassOfTrade: environment.apiEndPoint + 'ClassOfTrade/Save',
    },
    clotheDisplay:{
        getAllClotheDisplay: environment.apiEndPoint + 'ClotheDisplay/GetAllClotheDisplay',
        deleteClotheDisplaye: environment.apiEndPoint + 'ClotheDisplay/Delete',
        getClotheDisplayById: environment.apiEndPoint + 'ClotheDisplay/GetClotheDisplayById',
        saveClotheDisplay: environment.apiEndPoint + 'ClotheDisplay/Save',  
    },
    login:{
        login: environment.apiEndPoint + 'Login/Login',
        logout: environment.apiEndPoint + 'Login/Logout',
    },
    customer:{
        getAllCustomer: environment.apiEndPoint + 'Customer/Get-All-Customer',
        getCustomerById: environment.apiEndPoint + 'Customer/Get-Customer-By-Id',
        saveCustomer: environment.apiEndPoint + 'Customer/Save-Customer',
        deleteCustomer: environment.apiEndPoint + 'Customer/Delete-Customer',  
    },
}