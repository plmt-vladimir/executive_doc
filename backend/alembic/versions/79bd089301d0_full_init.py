"""full init

Revision ID: 79bd089301d0
Revises: 
Create Date: 2025-04-18 02:58:01.212149

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '79bd089301d0'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('construction_sites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('short_name', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('deliveries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('supplier', sa.String(), nullable=False),
    sa.Column('supply_type', sa.String(), nullable=False),
    sa.Column('record_number', sa.String(), nullable=False),
    sa.Column('invoice_number', sa.String(), nullable=False),
    sa.Column('record_date', sa.Date(), nullable=False),
    sa.Column('invoice_date', sa.Date(), nullable=False),
    sa.Column('invoice_file_url', sa.String(), nullable=False),
    sa.Column('note', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_deliveries_id'), 'deliveries', ['id'], unique=False)
    op.create_table('igs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('axes', sa.String(), nullable=False),
    sa.Column('marks', sa.String(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('file_url', sa.String(), nullable=False),
    sa.Column('scope_type', sa.Enum('site', 'object', 'zone', name='scopetype'), nullable=False),
    sa.Column('scope_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_igs_id'), 'igs', ['id'], unique=False)
    op.create_table('labtests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('axes', sa.String(), nullable=False),
    sa.Column('marks', sa.String(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('file_url', sa.String(), nullable=False),
    sa.Column('scope_type', sa.Enum('site', 'object', 'zone', name='scopetype'), nullable=False),
    sa.Column('scope_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_labtests_id'), 'labtests', ['id'], unique=False)
    op.create_table('material_references',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('unit', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_material_references_id'), 'material_references', ['id'], unique=False)
    op.create_table('organizations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('ogrn', sa.String(), nullable=False),
    sa.Column('inn', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('phone', sa.String(), nullable=False),
    sa.Column('license_name', sa.String(), nullable=False),
    sa.Column('license_date', sa.Date(), nullable=False),
    sa.Column('sro_number', sa.String(), nullable=False),
    sa.Column('sro_ogrn', sa.String(), nullable=False),
    sa.Column('sro_inn', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_organizations_id'), 'organizations', ['id'], unique=False)
    op.create_table('project_registry',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('code', sa.String(length=100), nullable=False),
    sa.Column('level', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['parent_id'], ['project_registry.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_project_registry_id'), 'project_registry', ['id'], unique=False)
    op.create_table('quality_documents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('number', sa.String(), nullable=False),
    sa.Column('issue_date', sa.Date(), nullable=False),
    sa.Column('expiry_date', sa.Date(), nullable=False),
    sa.Column('file_url', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_quality_documents_id'), 'quality_documents', ['id'], unique=False)
    op.create_table('sp',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('code', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('pdf_url', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('code')
    )
    op.create_table('transfer_documents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('number', sa.String(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('file_url', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_transfer_documents_id'), 'transfer_documents', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_table('construction_objects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('site_id', sa.Integer(), nullable=True),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('short_name', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['site_id'], ['construction_sites.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('delivered_materials',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('delivery_id', sa.Integer(), nullable=False),
    sa.Column('material_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Float(), nullable=False),
    sa.Column('quality_doc_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['delivery_id'], ['deliveries.id'], ),
    sa.ForeignKeyConstraint(['material_id'], ['material_references.id'], ),
    sa.ForeignKeyConstraint(['quality_doc_id'], ['quality_documents.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_delivered_materials_id'), 'delivered_materials', ['id'], unique=False)
    op.create_table('org_employees',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('organization_id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('position', sa.String(), nullable=False),
    sa.Column('ins', sa.String(), nullable=False),
    sa.Column('decree_number', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_org_employees_id'), 'org_employees', ['id'], unique=False)
    op.create_table('construction_zones',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('object_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['object_id'], ['construction_objects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('org_role_assignments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('organization_id', sa.Integer(), nullable=False),
    sa.Column('construction_site_id', sa.Integer(), nullable=True),
    sa.Column('construction_object_id', sa.Integer(), nullable=True),
    sa.Column('role', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['construction_object_id'], ['construction_objects.id'], ),
    sa.ForeignKeyConstraint(['construction_site_id'], ['construction_sites.id'], ),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_org_role_assignments_id'), 'org_role_assignments', ['id'], unique=False)
    op.create_table('aooks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('act_number', sa.String(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.Column('sign_date', sa.Date(), nullable=False),
    sa.Column('zone_id', sa.Integer(), nullable=True),
    sa.Column('object_id', sa.Integer(), nullable=True),
    sa.Column('code', sa.String(), nullable=False),
    sa.Column('axes', sa.String(), nullable=False),
    sa.Column('marks', sa.String(), nullable=False),
    sa.Column('notes', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['object_id'], ['construction_objects.id'], ),
    sa.ForeignKeyConstraint(['zone_id'], ['construction_zones.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_aooks_id'), 'aooks', ['id'], unique=False)
    op.create_table('storage_write_offs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('delivered_material_id', sa.Integer(), nullable=False),
    sa.Column('zone_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['delivered_material_id'], ['delivered_materials.id'], ),
    sa.ForeignKeyConstraint(['zone_id'], ['construction_zones.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_storage_write_offs_id'), 'storage_write_offs', ['id'], unique=False)
    op.create_table('aook_igs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aook_id', sa.Integer(), nullable=False),
    sa.Column('igs_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['aook_id'], ['aooks.id'], ),
    sa.ForeignKeyConstraint(['igs_id'], ['igs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_aook_igs_id'), 'aook_igs', ['id'], unique=False)
    op.create_table('aook_labtests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aook_id', sa.Integer(), nullable=False),
    sa.Column('lab_test_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['aook_id'], ['aooks.id'], ),
    sa.ForeignKeyConstraint(['lab_test_id'], ['labtests.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_aook_labtests_id'), 'aook_labtests', ['id'], unique=False)
    op.create_table('aook_responsibles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aook_id', sa.Integer(), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['aook_id'], ['aooks.id'], ),
    sa.ForeignKeyConstraint(['employee_id'], ['org_employees.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_aook_responsibles_id'), 'aook_responsibles', ['id'], unique=False)
    op.create_table('aook_sections',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aook_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('code', sa.String(), nullable=False),
    sa.Column('sheets', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['aook_id'], ['aooks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_aook_sections_id'), 'aook_sections', ['id'], unique=False)
    op.create_table('aook_sp',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aook_id', sa.Integer(), nullable=False),
    sa.Column('sp_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['aook_id'], ['aooks.id'], ),
    sa.ForeignKeyConstraint(['sp_id'], ['sp.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_aook_sp_id'), 'aook_sp', ['id'], unique=False)
    op.create_table('aosr',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('act_number', sa.String(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.Column('sign_date', sa.Date(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('registry_code', sa.String(), nullable=False),
    sa.Column('type_code', sa.String(), nullable=False),
    sa.Column('section_code', sa.String(), nullable=False),
    sa.Column('aooc_id', sa.Integer(), nullable=True),
    sa.Column('zone_id', sa.Integer(), nullable=True),
    sa.Column('object_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['aooc_id'], ['aooks.id'], ),
    sa.ForeignKeyConstraint(['object_id'], ['construction_objects.id'], ),
    sa.ForeignKeyConstraint(['zone_id'], ['construction_zones.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('stored_materials',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('storage_write_off_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['storage_write_off_id'], ['storage_write_offs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_stored_materials_id'), 'stored_materials', ['id'], unique=False)
    op.create_table('aook_aosr',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aook_id', sa.Integer(), nullable=False),
    sa.Column('aosr_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['aook_id'], ['aooks.id'], ),
    sa.ForeignKeyConstraint(['aosr_id'], ['aosr.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_aook_aosr_id'), 'aook_aosr', ['id'], unique=False)
    op.create_table('aook_materials',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aook_id', sa.Integer(), nullable=False),
    sa.Column('stored_material_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['aook_id'], ['aooks.id'], ),
    sa.ForeignKeyConstraint(['stored_material_id'], ['stored_materials.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_aook_materials_id'), 'aook_materials', ['id'], unique=False)
    op.create_table('aosr_igs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aosr_id', sa.Integer(), nullable=False),
    sa.Column('igs_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['aosr_id'], ['aosr.id'], ),
    sa.ForeignKeyConstraint(['igs_id'], ['igs.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('aosr_labtests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aosr_id', sa.Integer(), nullable=False),
    sa.Column('lab_test_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['aosr_id'], ['aosr.id'], ),
    sa.ForeignKeyConstraint(['lab_test_id'], ['labtests.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('aosr_materials',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aosr_id', sa.Integer(), nullable=False),
    sa.Column('stored_material_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['aosr_id'], ['aosr.id'], ),
    sa.ForeignKeyConstraint(['stored_material_id'], ['stored_materials.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('aosr_responsibles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aosr_id', sa.Integer(), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['aosr_id'], ['aosr.id'], ),
    sa.ForeignKeyConstraint(['employee_id'], ['org_employees.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('aosr_sections',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aosr_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('code', sa.String(), nullable=False),
    sa.Column('sheets', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['aosr_id'], ['aosr.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('aosr_sp',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aosr_id', sa.Integer(), nullable=False),
    sa.Column('sp_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['aosr_id'], ['aosr.id'], ),
    sa.ForeignKeyConstraint(['sp_id'], ['sp.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transfer_document_links',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('transfer_document_id', sa.Integer(), nullable=False),
    sa.Column('aook_id', sa.Integer(), nullable=True),
    sa.Column('aosr_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['aook_id'], ['aooks.id'], ),
    sa.ForeignKeyConstraint(['aosr_id'], ['aosr.id'], ),
    sa.ForeignKeyConstraint(['transfer_document_id'], ['transfer_documents.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_transfer_document_links_id'), 'transfer_document_links', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_transfer_document_links_id'), table_name='transfer_document_links')
    op.drop_table('transfer_document_links')
    op.drop_table('aosr_sp')
    op.drop_table('aosr_sections')
    op.drop_table('aosr_responsibles')
    op.drop_table('aosr_materials')
    op.drop_table('aosr_labtests')
    op.drop_table('aosr_igs')
    op.drop_index(op.f('ix_aook_materials_id'), table_name='aook_materials')
    op.drop_table('aook_materials')
    op.drop_index(op.f('ix_aook_aosr_id'), table_name='aook_aosr')
    op.drop_table('aook_aosr')
    op.drop_index(op.f('ix_stored_materials_id'), table_name='stored_materials')
    op.drop_table('stored_materials')
    op.drop_table('aosr')
    op.drop_index(op.f('ix_aook_sp_id'), table_name='aook_sp')
    op.drop_table('aook_sp')
    op.drop_index(op.f('ix_aook_sections_id'), table_name='aook_sections')
    op.drop_table('aook_sections')
    op.drop_index(op.f('ix_aook_responsibles_id'), table_name='aook_responsibles')
    op.drop_table('aook_responsibles')
    op.drop_index(op.f('ix_aook_labtests_id'), table_name='aook_labtests')
    op.drop_table('aook_labtests')
    op.drop_index(op.f('ix_aook_igs_id'), table_name='aook_igs')
    op.drop_table('aook_igs')
    op.drop_index(op.f('ix_storage_write_offs_id'), table_name='storage_write_offs')
    op.drop_table('storage_write_offs')
    op.drop_index(op.f('ix_aooks_id'), table_name='aooks')
    op.drop_table('aooks')
    op.drop_index(op.f('ix_org_role_assignments_id'), table_name='org_role_assignments')
    op.drop_table('org_role_assignments')
    op.drop_table('construction_zones')
    op.drop_index(op.f('ix_org_employees_id'), table_name='org_employees')
    op.drop_table('org_employees')
    op.drop_index(op.f('ix_delivered_materials_id'), table_name='delivered_materials')
    op.drop_table('delivered_materials')
    op.drop_table('construction_objects')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_transfer_documents_id'), table_name='transfer_documents')
    op.drop_table('transfer_documents')
    op.drop_table('sp')
    op.drop_index(op.f('ix_quality_documents_id'), table_name='quality_documents')
    op.drop_table('quality_documents')
    op.drop_index(op.f('ix_project_registry_id'), table_name='project_registry')
    op.drop_table('project_registry')
    op.drop_index(op.f('ix_organizations_id'), table_name='organizations')
    op.drop_table('organizations')
    op.drop_index(op.f('ix_material_references_id'), table_name='material_references')
    op.drop_table('material_references')
    op.drop_index(op.f('ix_labtests_id'), table_name='labtests')
    op.drop_table('labtests')
    op.drop_index(op.f('ix_igs_id'), table_name='igs')
    op.drop_table('igs')
    op.drop_index(op.f('ix_deliveries_id'), table_name='deliveries')
    op.drop_table('deliveries')
    op.drop_table('construction_sites')
    # ### end Alembic commands ###
