var documenterSearchIndex = {"docs":
[{"location":"contributing/#contributing","page":"Contributing","title":"Contributing","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Pages = [\"contributing.md\"]","category":"page"},{"location":"contributing/#Download-the-project","page":"Contributing","title":"Download the project","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Similar to installation, run","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"using Pkg\nPkg.update()\npkg\"dev Spglib\"","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"in the REPL.","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Then the package will be cloned to your local machine at a path. On macOS, by default is located at ~/.julia/dev/Spglib unless you modify the JULIA_DEPOT_PATH environment variable. (See Julia's official documentation on how to do this.) In the following text, we will call it PKGROOT.","category":"page"},{"location":"contributing/#instantiating","page":"Contributing","title":"Instantiate the project","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Go to PKGROOT, start a new Julia session and run","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"using Pkg\nPkg.instantiate()","category":"page"},{"location":"contributing/#How-to-build-docs","page":"Contributing","title":"How to build docs","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Usually, the up-to-state doc is available in here, but there are cases where users need to build the doc themselves.","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"After instantiating the project, go to PKGROOT, run","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"julia --color=yes docs/make.jl","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"in your terminal. In a while a folder PKGROOT/docs/build will appear. Open PKGROOT/docs/build/index.html with your favorite browser and have fun!","category":"page"},{"location":"contributing/#How-to-run-tests","page":"Contributing","title":"How to run tests","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"After instantiating the project, go to PKGROOT, run","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"julia --color=yes test/runtests.jl","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"in your terminal.","category":"page"},{"location":"contributing/#Style-Guide","page":"Contributing","title":"Style Guide","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Follow the style of the surrounding text when making changes. When adding new features please try to stick to the following points whenever applicable.","category":"page"},{"location":"contributing/#Julia","page":"Contributing","title":"Julia","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"4-space indentation;\nmodules spanning entire files should not be indented, but modules that have surrounding code should;\ndo not manually align syntax such as = or :: over adjacent lines;\nuse function ... end when a method definition contains more than one top-level expression;\nrelated short-form method definitions don't need a new line between them;\nunrelated or long-form method definitions must have a blank line separating each one;\nsurround all binary operators with whitespace except for ::, ^, and :;\nfiles containing a single module ... end must be named after the module;\nmethod arguments should be ordered based on the amount of usage within the method body;\nmethods extended from other modules must follow their inherited argument order, not the above rule;\nexplicit return should be preferred except in short-form method definitions;\navoid dense expressions where possible e.g. prefer nested ifs over complex nested ?s;\ninclude a trailing , in vectors, tuples, or method calls that span several lines;\ndo not use multiline comments (#= and =#);\nwrap long lines as near to 92 characters as possible, this includes docstrings;\nfollow the standard naming conventions used in Base.","category":"page"},{"location":"contributing/#Markdown","page":"Contributing","title":"Markdown","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Use unbalanced # headers, i.e. no # on the right-hand side of the header text;\ninclude a single blank line between top-level blocks;\ndo not hard wrap lines;\nuse emphasis (*) and bold (**) sparingly;\nalways use fenced code blocks instead of indented blocks;\nfollow the conventions outlined in the Julia documentation page on documentation.","category":"page"},{"location":"public/","page":"Library","title":"Library","text":"CurrentModule = Spglib","category":"page"},{"location":"public/#API","page":"Library","title":"API","text":"","category":"section"},{"location":"public/#Types","page":"Library","title":"Types","text":"","category":"section"},{"location":"public/","page":"Library","title":"Library","text":"There are two types, Dataset and SpacegroupType, correspond to SpglibDataset and SpglibSpacegroupType, respectively. They store basic information of a symmetry search. The struct Cell is to contain input data of a symmetry search.","category":"page"},{"location":"public/","page":"Library","title":"Library","text":"In Spglib, basis vectors are represented by three column vectors, following the convention of spglib. Coordinates of an atomic point are represented as three fractional values relative to basis vectors. So when constructing a Cell:","category":"page"},{"location":"public/","page":"Library","title":"Library","text":"The lattice can be a 33 matrix with columns as basis vectors, or it can be a vector containing the three basis vectors. To get those basis vectors from a Cell, use basis_vectors.\nThe atomic positions can be a 3N matrix, where N denotes the number of atoms in a cell. Or it can be a vector of N vectors, where each vector represents an atom.\nThe types variable corresponds to different atomic types.","category":"page"},{"location":"public/","page":"Library","title":"Library","text":"Cell\nDataset\nSpacegroupType","category":"page"},{"location":"public/#Spglib.Cell","page":"Library","title":"Spglib.Cell","text":"Cell(lattice, positions, types, magmoms=zeros(length(types)))\n\nThe basic input data type of Spglib.\n\nLattice parameters lattice are given by a 33 matrix with floating point values, where 𝐚, 𝐛, and 𝐜 are given as columns. Fractional atomic positions positions are given by a vector of N vectors with floating point values, where N is the number of atoms. Numbers to distinguish atomic species types are given by a list of N integers. The collinear polarizations magmoms only work with get_symmetry and are given as a list of N floating point values.\n\n\n\n\n\n","category":"type"},{"location":"public/#Spglib.Dataset","page":"Library","title":"Spglib.Dataset","text":"Dataset(spacegroup_number, hall_number, international_symbol, hall_symbol, choice, transformation_matrix, origin_shift, n_operations, rotations, translations, n_atoms, wyckoffs, site_symmetry_symbols, equivalent_atoms, crystallographic_orbits, primitive_lattice, mapping_to_primitive, n_std_atoms, std_lattice, std_types, std_positions, std_rotation_matrix, std_mapping_to_primitive, pointgroup_symbol)\n\nRepresent SpglibDataset, see its official documentation.\n\nnote: Note\nFields crystallographic_orbits and primitive_lattice are added after spglib v1.15.0.\n\n\n\n\n\n","category":"type"},{"location":"public/#Spglib.SpacegroupType","page":"Library","title":"Spglib.SpacegroupType","text":"SpglibSpacegroupType(number, international_short, international_full, international, schoenflies, hall_symbol, choice, pointgroup_international, pointgroup_schoenflies, arithmetic_crystal_class_number, arithmetic_crystal_class_symbol)\n\nRepresent SpglibSpacegroupType, see its official documentation.\n\n\n\n\n\n","category":"type"},{"location":"public/#Methods","page":"Library","title":"Methods","text":"","category":"section"},{"location":"public/","page":"Library","title":"Library","text":"Some methods are exported here. You can find their official documentation on this page.","category":"page"},{"location":"public/","page":"Library","title":"Library","text":"basis_vectors\nget_symmetry\nget_hall_number_from_symmetry\nget_dataset\nget_dataset_with_hall_number\nget_spacegroup_type\nget_symmetry_from_database\nget_spacegroup_number\nget_international\nget_schoenflies\nstandardize_cell\nfind_primitive\nrefine_cell\nniggli_reduce\ndelaunay_reduce\nget_multiplicity\nget_ir_reciprocal_mesh\nget_version","category":"page"},{"location":"public/#Spglib.basis_vectors","page":"Library","title":"Spglib.basis_vectors","text":"basis_vectors(cell::Cell)\n\nReturn the three basis vectors from cell.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_symmetry","page":"Library","title":"Spglib.get_symmetry","text":"get_symmetry(cell::Cell, symprec=1e-5)\n\nReturn the symmetry operations of a cell.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_hall_number_from_symmetry","page":"Library","title":"Spglib.get_hall_number_from_symmetry","text":"get_hall_number_from_symmetry(rotation::AbstractArray{T,3}, translation::AbstractMatrix, num_operations::Integer, symprec=1e-5) where {T}\n\nObtain hall_number from the set of symmetry operations.\n\nThis is expected to work well for the set of symmetry operations whose distortion is small. The aim of making this feature is to find space-group-type for the set of symmetry operations given by the other source than spglib. Note that the definition of symprec is different from usual one, but is given in the fractional coordinates and so it should be small like 1e-5.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_dataset","page":"Library","title":"Spglib.get_dataset","text":"get_dataset(cell::Cell, symprec=1e-5)\n\nSearch symmetry operations of an input unit cell structure.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_dataset_with_hall_number","page":"Library","title":"Spglib.get_dataset_with_hall_number","text":"get_dataset_with_hall_number(cell::Cell, hall_number::Integer, symprec=1e-5)\n\nSearch symmetry operations of an input unit cell structure, using a given Hall number.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_spacegroup_type","page":"Library","title":"Spglib.get_spacegroup_type","text":"get_spacegroup_type(hall_number::Integer)\n\nTranslate Hall number to space group type information.\n\n\n\n\n\nget_spacegroup_type(cell::Cell, symprec=1e-5)\n\nGet SpacegroupType from cell.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_symmetry_from_database","page":"Library","title":"Spglib.get_symmetry_from_database","text":"get_symmetry_from_database(hall_number)\n\nReturn the symmetry operations given a hall_number.\n\nThis function allows to directly access to the space group operations in the spglib database. To specify the space group type with a specific choice, hall_number is used.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_spacegroup_number","page":"Library","title":"Spglib.get_spacegroup_number","text":"get_spacegroup_number(cell::Cell, symprec=1e-5)\n\nGet the spacegroup number of a cell.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_international","page":"Library","title":"Spglib.get_international","text":"get_international(cell::Cell, symprec=1e-5)\n\nReturn the space group type in Hermann–Mauguin (international) notation.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_schoenflies","page":"Library","title":"Spglib.get_schoenflies","text":"get_schoenflies(cell::Cell, symprec=1e-5)\n\nReturn the space group type in Schoenflies notation.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.standardize_cell","page":"Library","title":"Spglib.standardize_cell","text":"standardize_cell(cell::Cell; to_primitive=false, no_idealize=false, symprec=1e-5)\n\nReturn standardized cell.\n\nThe standardized unit cell is generated from an input unit cell structure and its symmetry found by the symmetry search. The choice of the setting for each space group type is as explained for get_dataset.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.find_primitive","page":"Library","title":"Spglib.find_primitive","text":"find_primitive(cell::Cell, symprec=1e-5)\n\nFind the primitive cell of an input unit cell.\n\nThis function is now a shortcut of standardize_cell with to_primitive = true and no_idealize = false.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.refine_cell","page":"Library","title":"Spglib.refine_cell","text":"refine_cell(cell::Cell, symprec=1e-5)\n\nReturn refined cell.\n\nThe standardized crystal structure is obtained from a non-standard crystal structure which may be slightly distorted within a symmetry recognition tolerance, or whose primitive vectors are differently chosen, etc. This function is now a shortcut of standardize_cell with to_primitive = false and no_idealize = false.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.niggli_reduce","page":"Library","title":"Spglib.niggli_reduce","text":"niggli_reduce(lattice::AbstractMatrix, symprec=1e-5)\nniggli_reduce(cell::Cell, symprec=1e-5)\n\nApply Niggli reduction to input basis vectors lattice.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.delaunay_reduce","page":"Library","title":"Spglib.delaunay_reduce","text":"delaunay_reduce(lattice::AbstractMatrix, symprec=1e-5)\ndelaunay_reduce(cell::Cell, symprec=1e-5)\n\nApply Delaunay reduction to input basis vectors lattice.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_multiplicity","page":"Library","title":"Spglib.get_multiplicity","text":"get_multiplicity(cell::Cell, symprec=1e-5)\n\nReturn the exact number of symmetry operations. An error is thrown when it fails.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_ir_reciprocal_mesh","page":"Library","title":"Spglib.get_ir_reciprocal_mesh","text":"get_ir_reciprocal_mesh(cell::Cell, mesh, is_shift=falses(3); is_time_reversal=true, symprec=1e-5)\n\nReturn k-points mesh and k-point map to the irreducible k-points.\n\nIrreducible reciprocal grid points are searched from uniform mesh grid points specified by mesh and is_shift. mesh stores three integers. Reciprocal primitive vectors are divided by the number stored in mesh with (0,0,0) point centering. The centering can be shifted only half of one mesh by setting 1 or true for each is_shift element. If 0 or false is set for is_shift, it means there is no shift. This limitation of shifting enables the irreducible k-point search significantly faster when the mesh is very dense.\n\nThe reducible uniform grid points are returned in reduced coordinates as grid_address. A map between reducible and irreducible points are returned as grid_mapping_table as in the indices of grid_address. The number of the irreducible k-points are returned as the return value. The time reversal symmetry is imposed by setting is_time_reversal.\n\ncompat: Version 0.2\nThe returned mapping table is indexed starting at 1, not 0 as in Python or C.\n\n\n\n\n\n","category":"function"},{"location":"public/#Spglib.get_version","page":"Library","title":"Spglib.get_version","text":"get_version()\n\nObtain the version number of spglib.\n\nThis is the mergence of spg_get_major_version, spg_get_minor_version, and spg_get_micro_version in its C-API.\n\n\n\n\n\n","category":"function"},{"location":"installation/#installation","page":"Installation guide","title":"Installation guide","text":"","category":"section"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"Here are the installation instructions for package Spglib. If you have trouble installing it, please refer to our Troubleshooting page for more information.","category":"page"},{"location":"installation/#Install-Julia","page":"Installation guide","title":"Install Julia","text":"","category":"section"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"First, you should install Julia. We recommend downloading it from its official website. Please follow the detailed instructions on its website if you have to build Julia from source. Some computing centers provide preinstalled Julia. Please contact your administrator for more information in that case. Here's some additional information on how to set up Julia on HPC systems.","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"If you have Homebrew installed, open Terminal.app and type","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"brew install --cask julia","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"if you want to install it as a prebuilt binary app. Type","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"brew install julia","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"if you want to install it as a formula.","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"If you want to install multiple Julia versions in the same operating system, a suggested way is to use a version manager such as asdf. First, install asdf. Then, run","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"asdf install julia 1.6.6  # or other versions of Julia\nasdf global julia 1.6.6","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"to install Julia and set v1.6.6 as a global version.","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"You can also try another cross-platform installer for the Julia programming language juliaup.","category":"page"},{"location":"installation/#Which-version-should-I-pick?","page":"Installation guide","title":"Which version should I pick?","text":"","category":"section"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"You can install the \"Current stable release\" or the \"Long-term support (LTS) release\".","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"The \"Current stable release\" is the latest release of Julia. It has access to newer features, and is likely faster.\nThe \"Long-term support release\" is an older version of Julia that has continued to receive bug and security fixes. However, it may not have the latest features or performance improvements.","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"For most users, you should install the \"Current stable release\", and whenever Julia releases a new version of the current stable release, you should update your version of Julia. Note that any code you write on one version of the current stable release will continue to work on all subsequent releases.","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"For users in restricted software environments (e.g., your enterprise IT controls what software you can install), you may be better off installing the long-term support release because you will not have to update Julia as frequently.","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"Versions higher than v1.3, especially v1.6, are strongly recommended. This package may not work on v1.0 and below. Since the Julia team has set v1.6 as the LTS release, we will gradually drop support for versions below v1.6.","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"Julia and Julia packages support multiple operating systems and CPU architectures; check this table to see if it can be installed on your machine. For Mac computers with M-series processors, this package and its dependencies may not work. Please install the Intel-compatible version of Julia (for macOS x86).","category":"page"},{"location":"installation/#Install-Spglib","page":"Installation guide","title":"Install Spglib","text":"","category":"section"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"Now I am using macOS as a standard platform to explain the following steps:","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"Open Terminal.app, and type julia to start an interactive session (known as the REPL).\nRun the following commands and wait for them to finish:\njulia> using Pkg\n\njulia> Pkg.update()\n\njulia> Pkg.add(\"Spglib\")\nRun\njulia> using Spglib\nand have fun!\nWhile using, please keep this Julia session alive. Restarting might recompile the package and cost some time.","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"If you want to install the latest in-development (probably buggy) version of Spglib, type","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"using Pkg\nPkg.update()\npkg\"add Spglib#master\"","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"in the second step above.","category":"page"},{"location":"installation/#Update-Spglib","page":"Installation guide","title":"Update Spglib","text":"","category":"section"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"Please watch our GitHub repository for new releases. Once we release a new version, you can update Spglib by typing","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"using Pkg\nPkg.update(\"Spglib\")\nPkg.gc()","category":"page"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"in Julia REPL.","category":"page"},{"location":"installation/#Uninstall-and-reinstall-Spglib","page":"Installation guide","title":"Uninstall and reinstall Spglib","text":"","category":"section"},{"location":"installation/","page":"Installation guide","title":"Installation guide","text":"To uninstall, in a Julia session, run\njulia> using Pkg\n\njulia> Pkg.rm(\"Spglib\")\n\njulia> Pkg.gc()\nPress ctrl+d to quit the current session. Start a new Julia session and reinstall Spglib.","category":"page"},{"location":"troubleshooting/#Troubleshooting","page":"Troubleshooting","title":"Troubleshooting","text":"","category":"section"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"This page collects some possible errors you may encounter and trick how to fix them.","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"If you have additional tips, please submit a PR with suggestions.","category":"page"},{"location":"troubleshooting/#Installation-problems","page":"Troubleshooting","title":"Installation problems","text":"","category":"section"},{"location":"troubleshooting/#Cannot-find-the-Julia-executable","page":"Troubleshooting","title":"Cannot find the Julia executable","text":"","category":"section"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Make sure you have Julia installed in your environment. Please download the latest stable version for your platform. If you are using macOS, the recommended way is to use Homebrew. If you do not want to install Homebrew or you are using other platforms that Julia supports, download the corresponding binaries. And then create a symbolic link /usr/local/bin/julia to the Julia executable. If /usr/local/bin/ is not in your $PATH, export it to your $PATH. Some clusters, like Habanero, Comet, or Expanse, already have Julia installed as a module, you may just module load julia to use it. If not, either install by yourself or contact your administrator.","category":"page"},{"location":"troubleshooting/#Loading-SimpleWorkflows","page":"Troubleshooting","title":"Loading SimpleWorkflows","text":"","category":"section"},{"location":"troubleshooting/#Why-is-Julia-compiling/loading-modules-so-slow?-What-can-I-do?","page":"Troubleshooting","title":"Why is Julia compiling/loading modules so slow? What can I do?","text":"","category":"section"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"First, we recommend you download the latest version of Julia. Usually, the newest version has the best performance.","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"If you just want Julia to do a simple task and only once, you could start Julia REPL with","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"julia --compile=min","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"to minimize compilation or","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"julia --optimize=0","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"to minimize optimizations, or just use both. Or you could make a system image and run with","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"julia --sysimage custom-image.so","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"See Fredrik Ekre's talk for details.","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Spglib","category":"page"},{"location":"#Spglib","page":"Home","title":"Spglib","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for Spglib.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Spglib is a Julia wrapper of the C library spglib. It is used for finding and handling crystal symmetries. Thanks to Julia's binary artifact mechanism, the installation and usage of it should be smooth after Julia 1.3.","category":"page"},{"location":"","page":"Home","title":"Home","text":"There was already a package LibSymspg.jl, but it is no longer actively maintained. And it does not support the latest versions of spglib. It also has some different design decisions with this package, including, but not limited to, naming conventions, input types, and return types of functions.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The code is hosted on GitHub, with some continuous integration services to test its validity.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This repository is created and maintained by singularitti. Thanks to the contribution from searchengineorientprogramming.","category":"page"},{"location":"#Compatibility","page":"Home","title":"Compatibility","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Julia version: v1.3.0 to v1.7.0\nDependencies:\nStaticArrays.jl v0.8.3 and above\nStructHelpers.jl v0.1.0 and above\nspglib_jll.jl v1.14.1+0 and above\nOS: macOS, Linux, Windows, and FreeBSD\nArchitecture: x86, x64, ARM","category":"page"},{"location":"#Manual-Outline","page":"Home","title":"Manual Outline","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\n    \"installation.md\",\n    \"contributing.md\",\n    \"public.md\",\n]\nDepth = 3","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"}]
}
