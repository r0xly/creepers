export interface Block {
    durability: number | undefined,
    texture: {
        default: string,
        top?: string,
        bottom?: string,
        color?: Color3,
    },
    drops?: string,
}

const blocks: {[key: string]: Block} = {
    grass: {
        durability: 1,
        texture: {
            default: "rbxassetid://3633730371",
            top: "rbxassetid://4375290589",
            bottom: "rbxassetid://152569532",
        },
        drops: "dirt", 
    },

    dirt: {
        durability: 1,
        texture: {
            default: "rbxassetid://152569532"
        },
    },
    
    sand: {
        durability: 1,
        texture: {
            default: "rbxassetid://7226663843",
        },
    },

    wetsand: {
        durability: 1,
        texture: {
            default: "rbxassetid://7226663843",
            color: Color3.fromRGB(255, 199, 172),
        },
    },

    water: {
        durability: undefined,
        texture: {
            default: "rbxassetid://4375172367"
        },
    }
}

export function getBlockData(yPosition: number): Block {
    if (yPosition > 1) {
        return blocks.grass;
    } else if (yPosition === 1) {
        return blocks.sand;
    }

    return blocks.water;
}

export { blocks };