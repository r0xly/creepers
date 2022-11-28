import { CollectionService, Workspace } from "@rbxts/services";
import { Block, blocks, getBlockData } from "shared/Terrain/Blocks";
import { generateNoiseMap } from "shared/Terrain/Noise";

const parent = Workspace.Map;

function createBlock(position: Vector3, size: number, parent: Instance, data: Block): Part {
    const block = new Instance("Part");
    block.Size = new Vector3(1, 1, 1).mul(size);
    block.Position = position.mul(size);
    block.Parent = parent;
    block.Anchored = true;
    block.BottomSurface = Enum.SurfaceType.Smooth;
    block.TopSurface = Enum.SurfaceType.Smooth;
    block.Material = Enum.Material.Plastic;

    const top = new Instance("Decal");
    top.Parent = block;
    top.Face = Enum.NormalId.Top;
    top.Texture = data.texture.top || data.texture.default;
    top.Color3 = data.texture.color || Color3.fromRGB(255, 255, 255);

    const bottom = new Instance("Decal");
    bottom.Parent = block;
    bottom.Face = Enum.NormalId.Bottom;
    bottom.Texture = data.texture.bottom || data.texture.default;
    bottom.Color3 = data.texture.color || Color3.fromRGB(255, 255, 255);

    const front = new Instance("Decal");
    front.Parent = block;
    front.Face = Enum.NormalId.Front;
    front.Texture = data.texture.default;
    front.Color3 = data.texture.color || Color3.fromRGB(255, 255, 255);

    const back = new Instance("Decal");
    back.Parent = block;
    back.Face = Enum.NormalId.Back;
    back.Texture = data.texture.default;
    back.Color3 = data.texture.color || Color3.fromRGB(255, 255, 255);  
    
    const right = new Instance("Decal");
    right.Parent = block;
    right.Face = Enum.NormalId.Right;
    right.Texture = data.texture.default;
    right.Color3 = data.texture.color || Color3.fromRGB(255, 255, 255);

    const left = new Instance("Decal");
    left.Parent = block;
    left.Face = Enum.NormalId.Left;
    left.Texture = data.texture.default;
    left.Color3 = data.texture.color || Color3.fromRGB(255, 255, 255);

    return block;
}

function generateMap() {
    const mapWidth = Workspace.Map.GetAttribute("mapWidth") as number;
    const mapHeight = Workspace.Map.GetAttribute("mapHeight") as number;
    const nosieScale = Workspace.Map.GetAttribute("noiseScale") as number;
    const octaves = Workspace.Map.GetAttribute("octaves") as number;
    const persistance = Workspace.Map.GetAttribute("persistance") as number;
    const lacunarity = Workspace.Map.GetAttribute("lacunarity") as number;
    const seed = Workspace.Map.GetAttribute("seed") as number;
    const blockScale = 3.75;

    const noiseMap = generateNoiseMap(mapWidth, mapHeight, nosieScale, seed, octaves, persistance, lacunarity);

    parent.ClearAllChildren();

    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            const noiseValue = noiseMap[x][y];
            const yPosition = noiseValue > 0 ? math.floor(noiseValue * blockScale) : 0; 
            if (yPosition > 0) {
                const blockData = getBlockData(yPosition);
                const block = createBlock(new Vector3(x, yPosition, y), blockScale, parent, blockData);

                if (blockData === blocks.grass) {
                    CollectionService.AddTag(block, "Spawnpoint");
                }
            } else {
                // make waterrrr
            }
       }
    }
}

Workspace.Map.SetAttribute("seed", math.random(-10000, 10000))
Workspace.Map.AttributeChanged.Connect(generateMap);
generateMap();