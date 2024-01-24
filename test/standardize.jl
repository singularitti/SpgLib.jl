using Spglib: SPACEGROUP_SEARCH_FAILED, SpglibError, get_error_code

# This example is from https://spglib.github.io/spglib/definition.html#transformation-to-a-primitive-cell
@testset "Transformation to a primitive cell" begin
    lattice = [[7.17851431, 0, 0], [0, 3.99943947, 0], [0, 0, 8.57154746]]
    positions = [
        [0.0, 0.84688439, 0.1203133],
        [0.0, 0.65311561, 0.6203133],
        [0.0, 0.34688439, 0.3796867],
        [0.0, 0.15311561, 0.8796867],
        [0.5, 0.34688439, 0.1203133],
        [0.5, 0.15311561, 0.6203133],
        [0.5, 0.84688439, 0.3796867],
        [0.5, 0.65311561, 0.8796867],
    ]
    atoms = fill(8, length(positions))
    cell = Cell(lattice, positions, atoms)
    primitive_cell = find_primitive(cell)
    # Write transformation matrix directly
    @test primitive_cell.lattice ==
        cell.lattice * [
            1//2 1//2 0
            -1//2 1//2 0
            0 0 1
        ] ==
        [
            3.589257155 3.589257155 0.0
            -1.999719735 1.999719735 0.0
            0.0 0.0 8.57154746
        ]
    @test reduce(hcat, primitive_cell.positions) ≈ [  # Python results
        0.15311561 0.34688439 0.65311561 0.84688439
        0.84688439 0.65311561 0.34688439 0.15311561
        0.1203133 0.6203133 0.3796867 0.8796867
    ]
    @test primitive_cell.atoms == [8, 8, 8, 8]  # See issue #150
end

@testset "Rotate the basis vectors rigidly in the above example" begin
    lattice = [
        [5.0759761474456697, 5.0759761474456697, 0],
        [-2.8280307701821314, 2.8280307701821314, 0],
        [0, 0, 8.57154746],
    ]
    positions = [
        [0.0, 0.84688439, 0.1203133],
        [0.0, 0.65311561, 0.6203133],
        [0.0, 0.34688439, 0.3796867],
        [0.0, 0.15311561, 0.8796867],
        [0.5, 0.34688439, 0.1203133],
        [0.5, 0.15311561, 0.6203133],
        [0.5, 0.84688439, 0.3796867],
        [0.5, 0.65311561, 0.8796867],
    ]
    atoms = fill(8, length(positions))
    cell = Cell(lattice, positions, atoms)
    primitive_cell = find_primitive(cell)
    # Compare with documented results
    @test cell.lattice * [
        1//2 1//2 0
        -1//2 1//2 0
        0 0 1
    ] ≈ [
        3.95200346 1.12397269 0.0
        1.12397269 3.95200346 0.0
        0.0 0.0 8.57154746
    ]
    # Compare with documented and Python results
    @test primitive_cell.lattice ≈ [
        3.58925715 3.58925715 0.0
        -1.99971973 1.99971973 0.0
        0.0 0.0 8.57154746
    ]
    @test reduce(hcat, primitive_cell.positions) ≈ [  # Python results
        0.15311561 0.34688439 0.65311561 0.84688439
        0.84688439 0.65311561 0.34688439 0.15311561
        0.1203133 0.6203133 0.3796867 0.8796867
    ]
    @test primitive_cell.atoms == [8, 8, 8, 8]  # See issue #150
    @testset "Obtain the rotated primitive cell basis vectors" begin
        new_cell = standardize_cell(cell; to_primitive=true, no_idealize=true)
        @test Lattice(new_cell) ≈ [
            3.95200346 1.12397269 0.0
            1.12397269 3.95200346 0.0
            0.0 0.0 8.57154746
        ]
        @test new_cell.atoms == fill(8, 4)  # See issue #150
    end
end

# From https://github.com/unkcpz/LibSymspg.jl/blob/53d2f6d/test/test_api.jl#L113-L136
@testset "Cell reduce standardize" begin
    @testset "Test `find_primitive`" begin
        lattice = [
            4.0 0.0 0.0
            0.0 4.0 0.0
            0.0 0.0 4.0
        ]
        positions = [
            0.0 0.5
            0.0 0.5
            0.0 0.5
        ]
        atoms = ["Fe", "Fe"]
        cell = Cell(lattice, positions, atoms)
        new_cell = find_primitive(cell, 1e-5)
        @test Lattice(new_cell) ≈ [
            -2.0 2.0 2.0
            2.0 -2.0 2.0
            2.0 2.0 -2.0
        ]
        @test new_cell.positions ≈ [[0.0, 0.0, 0.0]]
        @test new_cell.atoms == ["Fe"]  # See issue #150
    end
    @testset "Test `refine_cell`" begin
        lattice = [
            -2.0 2.0 2.0
            2.0 -2.0 2.0
            2.0 2.0 -2.0
        ]
        positions = [0.0 0.0 0.0]'
        atoms = [:Fe]
        cell = Cell(lattice, positions, atoms)
        new_cell = refine_cell(cell, 1e-5)
        @test new_cell.lattice ≈ [
            4.0 0.0 0.0
            0.0 4.0 0.0
            0.0 0.0 4.0
        ]
        @test reduce(hcat, new_cell.positions) ≈ [
            0.0 0.5
            0.0 0.5
            0.0 0.5
        ]
        @test new_cell.atoms == [:Fe, :Fe]  # See issue #150
    end
end

@testset "A test that will cause an error" begin
    # See issue #99
    lattice = [
        6.0 0.0 6.0
        6.0 0.0 6.0
        0.0 6.0 6.0
    ]
    positions = [[0.0, 0.0, 0.0], [0.75, 0.75, 0.75], [0.5, 0.5, 0.5]]
    atoms = ["Na", "Na", "Cl"]
    cell = Cell(lattice, positions, atoms)
    @test_throws SpglibError find_primitive(cell)
    @test get_error_code() == SPACEGROUP_SEARCH_FAILED
    @test_throws SpglibError standardize_cell(cell, to_primitive=true)
    @test get_error_code() == SPACEGROUP_SEARCH_FAILED
end
