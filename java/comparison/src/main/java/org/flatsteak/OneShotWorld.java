package org.flatsteak;

import javalib.impworld.*;
import javalib.worldimages.WorldImage;
import lombok.Builder;
import lombok.Value;

public class OneShotWorld extends World {
    @Builder
    @Value
    public static class Config {
        int x;
        int y;
        int width;
        int height;
        WorldImage image;
    }

    final Config config;

    public OneShotWorld(Config config) {
        super();
        this.config = config;
    }

    @Override
    public WorldScene makeScene() {
        var scene = this.getEmptyScene();
        scene.placeImageXY(this.config.image, this.config.x, this.config.y);
        return scene;
    }

    public static void run(Config config) {
        new OneShotWorld(config).bigBang(config.width, config.height, 0);
    }
}
