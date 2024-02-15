import { Triangle } from '@/lib/triangle'
import { atom } from 'jotai'

export const triangleAtom = atom<Triangle | undefined | null>(undefined)
