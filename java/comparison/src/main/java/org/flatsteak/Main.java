package org.flatsteak;

import javalib.worldimages.*;

import java.awt.*;

public class Main {
    static OneShotWorld.Config simpleCircle() {
        var image = new CircleImage(100, OutlineMode.SOLID, Color.RED).movePinhole(-100, -100);
        return OneShotWorld.Config.builder()
                                  .image(image)
                                  .width(202)
                                  .height(202)
                                  .build();
    }

    static OneShotWorld.Config twoCircles() {
        var circles = new BesideImage(new CircleImage(10, OutlineMode.SOLID, Color.RED), new CircleImage(10, OutlineMode.SOLID, Color.BLUE));
        return OneShotWorld.Config.builder()
                                  .image(circles)
                                  .width(200)
                                  .height(200)
                                  .build();
    }

    static OneShotWorld.Config overlay() {
        var top = new RectangleImage(30, 60, OutlineMode.SOLID, Color.GREEN).movePinhole(15, 15);
        var bottom = new EllipseImage(60, 30, OutlineMode.SOLID, Color.RED).movePinhole(-5, -5);
        var overlay = new OverlayImage(top, bottom).movePinhole(-40, -40);
        return OneShotWorld.Config.builder()
                                  .image(overlay)
                                  .width(160)
                                  .height(160)
                                  .build();
    }

    public static void main(String[] args) {
        OneShotWorld.run(overlay());
    }
}