export get_error_code, get_error_message

@enum SpglibError begin
    SPGLIB_SUCCESS = 0
    SPGERR_SPACEGROUP_SEARCH_FAILED
    SPGERR_CELL_STANDARDIZATION_FAILED
    SPGERR_SYMMETRY_OPERATION_SEARCH_FAILED
    SPGERR_ATOMS_TOO_CLOSE
    SPGERR_POINTGROUP_NOT_FOUND
    SPGERR_NIGGLI_FAILED
    SPGERR_DELAUNAY_FAILED
    SPGERR_ARRAY_SIZE_SHORTAGE
    SPGERR_NONE
end

get_error_code() = ccall((:spg_get_error_code, libsymspg), SpglibError, ())

get_error_message(spglib_error::SpglibError) = unsafe_string(
    ccall((:spg_get_error_message, libsymspg), Cstring, (SpglibError,), spglib_error)
)
