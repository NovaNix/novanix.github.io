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

# Potential Solutions

I believe there are a few changes Blender could make to make rotation modes (and animation in general) more intuitive and easier to use.

These ideas are partially incomplete however, as they all have their own flaws and challenges. If fixing these issues were easy, then they'd be solved already. 

## Axis-Visualization

One of the simplest ideas that could be implemented is to make the rotation modes more transparent. For euler angles, this can be done by *visualizing* the axes of rotation.

By visualizing each axis, it becomes more clear to animators which value is associated with which axis.

## Tied-Value Interpolation

Potentially the most important feature that could be implemented is the ability to have interpolation modes that modify multiple values.

This would be VERY difficult to implement. The way Blender is currently programmed does not allow for this, instead relying heavily on individual component interpolation.
It would take a lot of developer effort, and would need to heavily thought through by the Blender Foundation to ensure that it fits cohesively into the rest of the program.

However the benefits are quite notable
- True quaternion interpolation would be possible
- All intermediate forms between two valid states would also be valid
- Animation curves can update in respect to each other

## 3D Animation Curves

In my opinion, the easiest way to make animation curves more intuitive is just to re-add the 3D context of the scene.

Motion paths attempt to do this, however they do not automatically update, and you still have to use the 2D graph to modify the path of the object.
Ideally, you'd be able to modify the curves *in* 3D space. 

This is not easy however... One of the primary issues is that for a single isolated object, this would be quite easy. However when dependencies, parenting, drivers, constraints, etc are used at all, this becomes a monumental task to implement, and slow to execute.

Additionally, when moving from the 2D graph to a 3D graph we actually *lose* three dimensions of time for each handle. 
Representing these in 3D space is difficult and unintuitive. 

### 3D Animation Graph

While the time issue is not easily solved, there is a compromise that can be made for the dependency issue.

Instead of displaying the curve in the viewport, the graph could be shown in a subspace of the viewport, or in a separate panel. This display would not include relations, showing instead the graph from the object's local space. 
This would negate the need to factor in complex relationships, instead being a pure 3D graph editor. 

### Rotation Ball 

While this change works well for animating positions, it doesn't provide an easy solution to visualizing rotation curves. For rotations, I believe it makes more sense to represent the curves in a *spherical space*.

Rotations could be displayed as a point on a ball (where the object's up vector intersects with the sphere), with another arrow showing the facing direction. Then, the path the object takes while rotating can be displayed as an arc on the surface of the sphere.
If quaternion interpolation is properly implemented, then it would be quite easy to represent the path the object takes as a spherical bezier curve.

This idea however is not without its flaws. It relies on the idea that the animation curve can be represented and modified in 3D space, which is not always possible depending on the rotation mode.
It also makes it difficult to animate the rotation around the up axis. Finally, the time issues from the previous example still persist.

However I believe that this would make animation more intuitive for animators.

## New Rotation Mode

Ideally, there would be a new rotation mode that could be implemented that keeps the benefits of quaternions, works with Blender's component-wise interpolation, and is more intuitive for animators to use.
However this is not an easy task. There are many challenges that come with making a rotation mode, and each method has its own benefits and problems.

A new rotation mode would have to meet the following requirements
1. needs to work with Blender's component-based interpolation
2. needs to be intuitive to use and modify with the graph editor
3. needs to be mathematically-sound
4. ideally would work well with the rotation ball idea

### Up-Forward Rotation 

One possible way to represent rotation is with two orthogonal normalized vectors, 
one representing the *up direction* of the object, and the other representing the *forward direction* of the object.

If these two directions are undesirable, it is also possible to represent the rotation with two other orthogonal directions, such as the up and right directions, or the forward and left, etc.

#### Fixing Invalid States

Because Blender does not enforce valid states, there must be a method to convert an invalid state into a valid one.

For this rotation mode, doing that is quite easy. As long as the up direction is normalized, that vector is in a valid state.
When it comes to the forward vector, as it must remain orthogonal to the up vector, transforming it into a valid state is more difficult.
However it can still easily be done by moving it into the nearest valid state.

(This can be done by taking the invalid vector and projecting it onto the closest point on a circle of radius 1 that is orthogonal to the up vector)

#### Pros

This method has a few interesting benefits compared to other rotation modes
- When using Blender's component-wise interpolation, it produces sensible results with minimal effort
- The animation curves are fairly intuitive when animating the each vector in isolation of each other
- This method doesn't use any trigonometry to represent or animate (which can be slow to compute)
- The forward vector can be *pinned*, to avoid wiggling with the facing direction
- Using a forward vector instead of a rotation around the up-axis avoids problems caused by the [hairy ball theorem](https://en.wikipedia.org/wiki/Hairy_ball_theorem)
- This method would also work with the rotation ball idea from earlier, without the need to implement tied values.

#### Cons 

This method is not perfect however, no rotation mode could be. 
- The path the forward vector takes may not be the most optimal
- Animating both the up and forward vectors at the same time can be unintuitive (which could be addressed by the rotation ball idea)
- When performing the component-wise interpolation between two states, if both states are coplanar with each other then there will be a sudden jump. 

# Conclusion

Overall, rotation in 3D is a mess, and Blender doesn't make it any cleaner. 
