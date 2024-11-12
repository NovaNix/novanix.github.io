intro to rotation modes

intro to 2d rotation

intro to 3d rotation

## euler angle basics

### euler angle flaws

gimbal lock (explain how there are multiple euler angles for each rotation and how that causes problems)

animation issues (explain tops of objects dont track smoothly)


## axis angle basics

instead of rotation around 3 axes, you rotate around a single axis

## quaternion basics

## quaterion flaws

difficult to understand

# fundamental blender issues

doesn't take advantage of quaternion interpolation

    individual values are interpolated. curves for these values can be modified individually without messing with each other, which can be a problem...

    this also means that normalized values can become unnormalized when interpolating them

in the case of axis angle and quaternion, taking this fundamentally 3d thing (a 3d unit vector) and modifying it through a 2d graph

    it's difficult to map the curves into 3d however because each handle also includes a dimension of time

    in addition to this, when parenting and other dynamic behaviors are included, it becomes difficult to visually display motion maps and curves in 3d space

# solutions/flawed solutions

required: paired animation of values. 3 values dependent on each other need to be animatable together

rotation ball (could be called spherical graph view): view rotations through space in an isolated 3d ball, with curves placed on the surface of that ball

    cons: mapping time vector is difficult and unintuitive, encoding facing direction is difficult, required fundamental difference in how rotation is animated (as it doesn't align with the graph view anymore)

more rapid placement of inbetweens?: instead of handling rotation through curves, orientations can be pinned like inbetweens to guide rotation more efficiently

new rotation mode: something that is intuitive to animators and that lacks the technical issues of other methods (MAY BE IMPOSSIBLE)




