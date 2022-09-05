export const takeTheCurrentDate = (): string => {
  let finishTime: any = new Date()
  localStorage.setItem('finishTime', finishTime)
  let dd: string = String(finishTime.getDate()).padStart(2, '0')
  let mm: string = String(finishTime.getMonth() + 1).padStart(2, '0')
  let yyyy: number = finishTime.getFullYear()
  finishTime = mm + '/' + dd + '/' + yyyy
  return finishTime
}
