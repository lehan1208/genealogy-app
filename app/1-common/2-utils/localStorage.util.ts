export function storeData(dataValue: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("familyData", JSON.stringify(dataValue))
  }
}

export function getData() {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem("familyData") || "[]")
  }
}