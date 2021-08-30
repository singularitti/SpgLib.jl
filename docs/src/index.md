```@meta
CurrentModule = Spglib
```

# Spglib

`Spglib` is a Julia wrapper of the C library
[`spglib`](https://github.com/spglib/spglib). It is used for finding and
handling crystal symmetries. Thanks to Julia's binary artifact mechanism, the
installation and usage of it should be smooth after Julia 1.3.

There was already a package
[`LibSymspg.jl`](https://github.com/unkcpz/LibSymspg.jl), but it is
[no longer actively maintained](https://github.com/unkcpz/LibSymspg.jl/issues/4).
And it does not support the latest versions of `spglib`. It also has some
different design decisions with this package, including, but not limited to,
naming conventions, input types, and return types of functions.

The code is [hosted on GitHub](https://github.com/singularitti/Spglib.jl), with
some continuous integration services to test its validity.

This repository is created and maintained by
[singularitti](https://github.com/singularitti). Thanks to the contribution from
[searchengineorientprogramming](https://github.com/searchengineorientprogramming).

## Compatibility

- [Julia version: `v1.3.0` to `v1.6.1`](https://julialang.org/downloads/)
- Dependencies:
  - [`StaticArrays.jl`](https://github.com/JuliaArrays/StaticArrays.jl) `v0.8.3`
    and above
  - [`StructEquality.jl`](https://github.com/schlichtanders/StructEquality.jl)
    `v1.0.0` and above
  - [`UnPack.jl`](https://github.com/mauro3/UnPack.jl) `v1.0.0` and above
  - [`spglib_jll.jl`](https://github.com/JuliaBinaryWrappers/spglib_jll.jl)
    `v1.14.1+0` and above
- OS: macOS, Linux, Windows, and FreeBSD
- Architecture: x86, x64, ARM

## Manual Outline

```@contents
Pages = [
    "installation.md",
    "api.md",
]
Depth = 3
```

## Index

```@index

```
