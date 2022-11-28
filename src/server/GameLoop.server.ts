import { CollectionService, Players } from "@rbxts/services";

function getRandomSpawnPoint() {
    const spawnpoints = CollectionService.GetTagged("Spawnpoint");
    return spawnpoints[math.random(1, spawnpoints.size())] as BasePart;
}

Players.PlayerAdded.Connect((player) => {
    player.CharacterAdded.Connect((character) => {
        const spawnPoint = getRandomSpawnPoint();
        const rootPart = character.WaitForChild("HumanoidRootPart") as BasePart;
        wait()
        rootPart.CFrame = spawnPoint.CFrame.mul(new CFrame(0, 2, 0));
    })
});