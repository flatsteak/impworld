package org.flatsteak;

import javalib.worldimages.*;

import java.awt.*;

public class Main {
    static OneShotWorld.Config centerSquare() {
        var image = new RectangleImage(100, 100, OutlineMode.SOLID, Color.RED).movePinhole(-55, -55);
        var bb = image.getBB();
        var sz = image.getWidth();
        return OneShotWorld.Config.builder()
                                  .image(image)
                                  .width(110)
                                  .height(110)
                                  .build();
    }

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

    static OneShotWorld.Config fakeBeside() {
        var rect = new BesideImage(new RectangleImage(100, 100, OutlineMode.SOLID, Color.RED)).movePinhole(-55, -55);
        return OneShotWorld.Config.builder()
                                  .image(rect)
                                  .width(110)
                                  .height(110)
                                  .build();
    }

    static OneShotWorld.Config overlay() {
        var top = new RectangleImage(30, 60, OutlineMode.SOLID, Color.GREEN);
        var bottom = new EllipseImage(60, 30, OutlineMode.SOLID, Color.RED);
        var overlay = new OverlayImage(top, bottom).movePinhole(-40, -40);
        return OneShotWorld.Config.builder()
                                  .image(overlay)
                                  .width(80)
                                  .height(80)
                                  .build();
    }

    static OneShotWorld.Config beside() {
        var r1 = new RectangleImage(50, 50, OutlineMode.OUTLINE, Color.RED);
        var r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.GREEN);
        var r3 = new RectangleImage(50, 50, OutlineMode.OUTLINE, Color.BLUE);
        var beside = new BesideImage(r1, r2, r3).movePinhole(-80, -30);
        return OneShotWorld.Config.builder()
                                  .image(beside)
                                  .width(160)
                                  .height(60)
                                  .build();
    }

    static OneShotWorld.Config besideAlign() {
        var r1 = new RectangleImage(50, 150, OutlineMode.OUTLINE, Color.RED);
        var r2 = new RectangleImage(50, 50, OutlineMode.SOLID, Color.GREEN);
        var r3 = new RectangleImage(50, 100, OutlineMode.OUTLINE, Color.BLUE);
        var beside = new BesideImage(r1, r2, r3).movePinhole(-80, -80);
        return OneShotWorld.Config.builder()
                                  .image(beside)
                                  .width(160)
                                  .height(160)
                                  .build();
    }

    static OneShotWorld.Config triangle() {
        var t1 = new TriangleImage(new Posn(-10, -20), new Posn(0, 48), new Posn(36, 48), OutlineMode.SOLID, Color.BLACK).movePinhole(-25, -35);
        return OneShotWorld.Config.builder()
                                  .image(t1)
                                  .height(150)
                                  .width(150)
                                  .build();
    }

    public static void main(String[] args) {
        OneShotWorld.run(triangle());
    }
}