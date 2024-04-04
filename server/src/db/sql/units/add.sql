INSERT INTO units(unit, icon)
VALUES (
    ${unit},
    ${icon}
)
RETURNING *;
