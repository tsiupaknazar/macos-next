import { appLibrary } from "@/data/appLibrary";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppId = keyof typeof appLibrary;

type BinItem = {
    id: string;
    name: AppId;
    deleteDate: Date;
}

type BinState = {
    binItems: BinItem[];
    moveToBin: (item: BinItem) => void;
    restoreFromBin: (id: string) => void;
    restoreAll: () => void;
    emptyBin: () => void;
};

export const useBinStore = create<BinState>()(
    persist(
        (set) => ({
            binItems: [],

            moveToBin: (item) =>
                set((state) => ({
                    binItems: [...state.binItems, item],
                })),

            restoreFromBin: (id) =>
                set((state) => ({
                    binItems: state.binItems.filter((i) => i.id !== id),
                })),

            restoreAll: () =>
                set(() => ({
                    binItems: [],
                })),

            emptyBin: () =>
                set(() => ({
                    binItems: [],
                })),
        }),
        {
            name: "bin-store",
        }
    )
);

