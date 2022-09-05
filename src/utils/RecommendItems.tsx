import { PantsType } from '../state/reducers/PantsReducer'
import { ShirtType } from '../state/reducers/ShirtsReducer'
import { ShoesType } from '../state/reducers/ShoesReducer'

export const recommendPantsUtils = (
  details: { size: string; color: string },
  availablePants: PantsType[],
): PantsType[] => {
  let recommendPants: PantsType[] = []
  let recommendedColors: PantsType[] = availablePants.filter(
    (pants: PantsType) => {
      return pants.color === details.color
    },
  )
  let recommendedSizes: PantsType[] = availablePants.filter(
    (pants: PantsType) => {
      if (details.size === 'S') {
        return pants.size >= 30 && pants.size <= 36
      } else if (details.size === 'M' || details.size === 'L') {
        return pants.size >= 37 && pants.size <= 40
      } else if (details.size === 'XL' || details.size === 'XXL') {
        return pants.size >= 41 && pants.size <= 48
      }
    },
  )
  recommendPants = [...recommendedSizes, ...recommendedColors]
  return recommendPants
}

export const recommendShoesUtils = (
  details: { size: string; color: string },
  availableShoes: ShoesType[],
): ShoesType[] => {
  let recommendedShoes: ShoesType[] = []
  let recommendedColors: ShoesType[] = availableShoes.filter(
    (shoes: ShoesType) => {
      return shoes.color === details.color
    },
  )
  let recommendedSizes = availableShoes.filter((shoes: ShoesType) => {
    if (details.size === 'S') {
      return shoes.size >= 36 && shoes.size <= 40
    } else if (details.size === 'M' || details.size === 'L') {
      return shoes.size >= 41 && shoes.size <= 43
    } else if (details.size === 'XL' || details.size === 'XXL') {
      return shoes.size >= 41 && shoes.size <= 48
    }
  })
  recommendedShoes = [...recommendedSizes, ...recommendedColors]
  return recommendedShoes
}
