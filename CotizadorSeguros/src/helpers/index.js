
export function getYearDiference(year){
    return new Date().getFullYear() - year
}

export function calculateBrand(brand){

    if(brand === '1'){
        return 1.3
    }

    if(brand === '2'){
        return 1.15
    }

    if(brand === '3'){
        return 1.05
    }

}

export function calculatePlan(plan){
    return plan === '1' ? 1.2 : 1.5
}


export function formatCash(amount){
    return amount.toLocaleString("en-US",{
        style:"currency",
        currency:"USD",
    })
}