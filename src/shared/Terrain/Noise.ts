import { getFallOffAtPoint } from "./FalloffGenerator";

type noiseMap = {[key: number]: number[]};

export function generateNoiseMap(mapWidth: number, mapHeight: number, scale: number, seed: number, octaves: number, persistance: number, lacunarity: number, useFallOff: boolean = true) {
    let noiseMap: noiseMap = {};

    scale = scale <= 0 ? 0.0001 : scale;

    for (let x = 0; x < mapWidth; x++) {
        noiseMap[x] = [];
        for (let y = 0; y < mapHeight; y++) {
            let amplitude = 1;
            let frequency = 1;
            let noiseHeight = 0;

            for (let i = 0; i < octaves; i++) {
                let sampleX = x / scale * frequency;
                let sampleY = y / scale * frequency;

                let fallOff = useFallOff === true ? getFallOffAtPoint((mapWidth + mapWidth) / 2, x, y) : -1;
                let perlinValue = math.noise(sampleX, sampleY, seed) * 2 - fallOff;
                noiseHeight += perlinValue * amplitude;

                amplitude *= persistance;
                frequency *= lacunarity;
            }

            noiseMap[x][y] = noiseHeight;
        }
    }

    return noiseMap;
}