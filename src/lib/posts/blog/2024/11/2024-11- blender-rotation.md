intro to rotation modes

# 2D Rotation

Rotation in two dimensions is fairly straightforward. All it takes is a single number to represent how much the object is rotated around its center point.



# 3D Rotation

Coming from 2D rotation, 3D rotation is much more complex. Instead of having a single degree of freedom, in 3D we have to represent three degrees of freedom.

Because of this, there are several different strategies to represent rotation. Each one has their own advantages or disadvantages.

Before these methods can be explained however, we need to discuss some concepts.

## Axes

In our rotation logic, we care a lot about axes. In particular, the X axis, the Y axis, and the Z axis all tend to come up. These are all aligned with the X, Y, and Z dimensions respectively.

In the coordinate system Blender uses, these axes correspond to the following directions:
- -Y: Forward
- X: Right
- Z: Up

However we don't always care about these axes in respect to the world itself, sometimes we care about the axes of the object.
When the model is rotated, the object's local axes are rotated as well. These are called relative axes.


## Euler Rotation

Euler rotation is one of the simplest rotation models. You can imagine it as an extension of 2D rotation.

Euler rotation works by defining how much the object should be rotated across the object's relative X, Y, and Z axes. 

### Order Matters

When applying the rotation around each axis, the order in which you apply the rotations matters.
For example, rotating around the X axis, then the Y axis, and then the Z axis can produce a different final orientation compared to rotating around the Z axis, Y axis, and X axis. 

In Blender, the order of these rotations is chosen when picking the rotation mode. 
Ex: XYZ rotation mode: X -> Y -> Z, ZYX rotation mode: Z -> Y -> X 

### Euler Rotation Flaws

When thinking about representing things in space, it is useful to think about **degrees of freedom**. Rotation requires three degrees of freedom.
In the case of euler angles, those three degrees are easy to map to the component values of the rotation; there are 3 components, one for each degree.

However, there are certain orientations where a problem known as **gimbal-lock** occurs. Gimbal-lock is when two of the axes being rotated around overlap, effectively removing a degree of freedom.
This is problematic for several reasons, but one of the primary issues is with animation. Gimbal-lock can create weird jumps and other problems when trying to animate between two orientations.

<!-- INSERT GIMBAL LOCK ANIMATION -->

In addition to gimbal-lock, it is just very difficult to smoothly transition between two rotations defined in euler angles.
Instead of smoothly tracking from one rotation to another, it can take wild swoops to its destination. 

Euler rotation also allows for the same orientation to be encoded in multiple different ways, which means that when animating between these rotations, there can be unintended movement when you intend for the object to be still.

In general, Eular Rotation works well for static positions, but they have many flaws when animated. 

## Axis-Angle Rotation

Axis-angle rotation works by defining an axis and a rotation around that axis.
This avoids the gimbal-lock problem found in Euler rotation, but it's not without its own flaws. 

The primary issue with axis-angle rotation is that it's both awkward for computers and people to use.
- For computers, it's somewhat difficult to interpolate between two rotations. In fact, axis-angle rotations are typically converted into quaternions when interpolating them.
- For people, the animation curves are hard to conceptualize, which can make them difficult to animate

## Quaternion Rotation

Quaternion rotations can be thought of as a more complex version of Axis-Angle rotations. 

Explaining the math behind them is difficult, but they function similarly to axis-angle rotations, except with a unit quaternion rather than an axis and an angle.

They have some properties that make them nice to use mathematically, meaning computers can nicely interpolate between two rotations defined with quaternions. 

## Quaternion Flaws

While quaternions are ideal for computers, they aren't ideal for people. They're difficult to conceptualize for animators, and they're difficult to understand mathematically for developers.
While trying to research how the math behind them works, the common bit of advice I heard is to not even try, instead relying on the work other people have done to make them usable. 

Because of this, modifying the animation curves of quaternions can be quite difficult. 

# Blender's Fundamental Animation Problems

Rotation modes aside, Blender has a few fundamental problems with how rotation animations are performed and edited.

## Component-Wise Interpolation 

The primary issue with how Blender animates rotation has to deal with the fact that Blender doesn't perform quaternion interpolation.

In Blender, things are interpolated per-component. For something like position or scale, where each component is isolated from each other, this works quite well.
It's intuitive, it's fast, and it makes animation curves fairly straightforward.

When it comes to rotation, this is only the case for a few rotation modes. Euler Angles for example, is *somewhat* isolated. This makes working with their curves slightly more intuitive than other rotation modes.
However for axis-angle and quaternion rotation, each component is *tied* to each other in some way.
With axis-angle rotation for instance, the axis the object is rotated around is a unit vector. 
And with quaternion rotation, the entire thing is a unit quaternion. 

When editing one value, the others should update to keep the values in an acceptable state. And Blender *does* do this when using the transformation tools.
However while animating, Blender may put the values into an invalid state. In these situations, Blender will put the values into a valid state.

While this *works*, this method does not produce the same results as quaternion interpolation. 

When we animate between two orientations, we expect that the object will move the least amount it needs to in order to reach the desired rotation.
But no matter what rotation mode you choose, none of them achieve this result without manually modifying the curves.

## Animation Curves

Animation curves are a powerful tool. They allow for artists to quickly tweak how two states are interpolated, which is extremely important for animation.
However they have a fundamental flaw. 

For animating positions, they're quite intuitive and are fairly powerful. However there's still a slight problem that is easy to overlook.

The problem is that we're taking a three-dimensional value and converting it into a set of two-dimensional values. It can be difficult sometimes to tell how changes made on the animation graph will look when applied to the 3D scene, as the 3D context is being stripped from the value.

This provides some benefits however. Each component being its own independent curve makes it easy to modify each component's interpolation in isolation.
It also has the benefit of giving us another dimension to control: time. The x-axis of the animation graph is time, while the y-axis is in the unit of the value. 
Having control over the timing is very important for animators.

It also makes it easy to implement and render on the development side of things, as placing everything in the two-dimensional space where dependencies and relations are ignored is quite easy.
Currently in Blender, if you wanted to see the path the object will take shown in 3D, you have to use motion paths, which do not automatically update when the graph is changed.

For animating values like positions, because each component is isolated for position values, the animation graph works relatively well. 
It can be a little clunky when dealing with large or small values, but it's still easy to use.

When it comes to rotation however, the animation graph becomes *much* less intuitive.

Because values in each rotation mode tend to be tied to each other in some way, you constantly have to switch between different curves to get the desired effect.
Additionally, in axis-angle and quaternion rotation modes, it is not intuitive which curve will affect what part of the rotation.

With position curves, even isolated from the 3D context, it is reasonably easy to look at an animation graph and determine what the resulting animation will look like at each frame.
However with rotation curves, it is borderline impossible. 

<!-- # fundamental blender issues -->

<!-- doesn't take advantage of quaternion interpolation

    individual values are interpolated. curves for these values can be modified individually without messing with each other, which can be a problem...

    this also means that normalized values can become unnormalized when interpolating them

in the case of axis angle and quaternion, taking this fundamentally 3d thing (a 3d unit vector) and modifying it through a 2d graph

    it's difficult to map the curves into 3d however because each handle also includes a dimension of time

    in addition to this, when parenting and other dynamic behaviors are included, it becomes difficult to visually display motion maps and curves in 3d space -->

# solutions/flawed solutions

required: paired animation of values. 3 values dependent on each other need to be animatable together

rotation ball (could be called spherical graph view): view rotations through space in an isolated 3d ball, with curves placed on the surface of that ball

    cons: mapping time vector is difficult and unintuitive, encoding facing direction is difficult, required fundamental difference in how rotation is animated (as it doesn't align with the graph view anymore)

more rapid placement of inbetweens?: instead of handling rotation through curves, orientations can be pinned like inbetweens to guide rotation more efficiently

new rotation mode: something that is intuitive to animators and that lacks the technical issues of other methods (MAY BE IMPOSSIBLE)

requirements for a new rotation mode:
1. needs to work with blender's component-based interpolation
2. needs to be intuitive
3. needs to be easier to edit on the graph 

## Up Forward Rotation

defined through an up vector and a forward vector

interpolation between two sets while keeping the two vectors orthogonal is difficult
but since blender doesn't care if the two are orthogonal or not, we dont need to try to keep them orthogonal
we just need to keep adjusting the vectors on each interpolation step to be orthogonal

### why not store forward as rotation value (up angle rotation)
- hairy ball theorem (which direction *counts* as forward?)
- trig (curves that keep the forward direction in a single direction would be difficult using bezier curves)


pros: 
- correct interpolation in almost all cases (though distribution might not be properly normalized)
- works *relatively* well in blender's component based system
- interpolation process avoids trig (trig is slow, and could cause unintentional wiggling)
- allows for the forward direction to be "pinned" to prevent unintentional wiggling (also helped by the interpolation process not using trig)

cons:
- if the two sets are coplanar, you run into issues... (180 degree rotation has issues, etc) (this could maybe be fixed using handles though?)
- handles still arent *super* intuitive? (could be aided using rotation ball idea?)